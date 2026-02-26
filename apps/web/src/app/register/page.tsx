'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const registerSchema = z.object({
    fullName: z.string().min(3, 'الاسم الكامل مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    role: z.enum(['CLIENT', 'PROVIDER'], {
        required_error: 'الرجاء اختيار نوع الحساب',
    }),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'CLIENT',
        }
    });

    const { login } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const selectedRole = watch('role');

    const onSubmit = async (data: RegisterForm) => {
        setError(null);
        try {
            const res = await fetch('http://localhost:4000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'حدث خطأ أثناء التسجيل');
            }

            const result = await res.json();
            login(result.access_token, result.user);

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center p-4 py-12" dir="rtl">
            <div className="card w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
                    <p className="text-gray-500 mt-2 text-sm">انضم إلى أكبر منصة لتصنيع الأثاث</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[8px] mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-right">الاسم الكامل</label>
                        <input
                            {...register('fullName')}
                            className="input-field text-right"
                            placeholder="الاسم الثلاثي"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1 text-right">{errors.fullName.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-right">البريد الإلكتروني</label>
                        <input
                            {...register('email')}
                            className="input-field text-right"
                            placeholder="example@mail.com"
                            type="email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 text-right">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-right">نوع الحساب</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`border rounded-[8px] p-3 cursor-pointer text-center transition-all ${selectedRole === 'CLIENT' ? 'border-primary bg-blue-50' : 'hover:bg-gray-50'}`}>
                                <input type="radio" {...register('role')} value="CLIENT" className="sr-only" />
                                <span className="block font-bold">عميل</span>
                                <span className="text-[10px] text-gray-500">أبحث عن تصنيع</span>
                            </label>
                            <label className={`border rounded-[8px] p-3 cursor-pointer text-center transition-all ${selectedRole === 'PROVIDER' ? 'border-primary bg-blue-50' : 'hover:bg-gray-50'}`}>
                                <input type="radio" {...register('role')} value="PROVIDER" className="sr-only" />
                                <span className="block font-bold">مصنع / نجار</span>
                                <span className="text-[10px] text-gray-500">أقدم عروض تنفيذ</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-right">كلمة المرور</label>
                        <input
                            {...register('password')}
                            className="input-field text-right"
                            type="password"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1 text-right">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-3 mt-4 disabled:opacity-50"
                    >
                        {isSubmitting ? 'جاري التحميل...' : 'إنشاء الحساب'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-500">لديك حساب بالفعل؟ </span>
                    <Link href="/login" className="text-primary font-bold hover:underline">تسجيل الدخول</Link>
                </div>
            </div>
        </div>
    );
}
