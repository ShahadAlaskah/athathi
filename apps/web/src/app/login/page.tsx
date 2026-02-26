'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('البريد الإلكتروني غير صحيح'),
    password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (data: LoginForm) => {
        setError(null);
        try {
            const res = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'فشل تسجيل الدخول');
            }

            const result = await res.json();
            login(result.access_token, result.user);

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-120px)] items-center justify-center p-4" dir="rtl">
            <div className="card w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
                    <p className="text-gray-500 mt-2 text-sm">مرحباً بك مجدداً في أثاثي</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[8px] mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
                    <div>
                        <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                        <input
                            {...register('email')}
                            className="input-field text-right"
                            placeholder="example@mail.com"
                            type="email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">كلمة المرور</label>
                        <input
                            {...register('password')}
                            className="input-field text-right"
                            type="password"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-3 mt-4 disabled:opacity-50"
                    >
                        {isSubmitting ? 'جاري التحميل...' : 'دخول'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <span>ليس لديك حساب؟ </span>
                    <Link href="/register" className="text-primary font-bold hover:underline">أنشئ حساباً جديداً</Link>
                </div>
            </div>
        </div>
    );
}
