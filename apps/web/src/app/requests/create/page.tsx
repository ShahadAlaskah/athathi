'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const requestSchema = z.object({
    title: z.string().min(5, "العنوان قصير جداً"),
    description: z.string().min(10, "الوصف غير كافي"),
    category: z.string().min(1, "الرجاء اختيار التصنيف"),
    city: z.string().min(1, "الرجاء اختيار المدينة"),
    budget: z.preprocess((val) => Number(val), z.number().min(50, "أقل ميزانية هي 50 ريال")),
    material: z.string().min(1, "الخامة مطلوبة"),
    color: z.string().min(1, "اللون مطلوب"),
    quantity: z.preprocess((val) => Number(val), z.number().min(1, "الكمية يجب أن تكون 1 على الأقل")),
    length: z.string().min(1, "مطلوب"),
    width: z.string().min(1, "مطلوب"),
    height: z.string().min(1, "مطلوب"),
    deadline: z.string().min(1, "موعد التسليم مطلوب"),
    withInstallation: z.boolean().default(false),
});

type RequestForm = z.infer<typeof requestSchema>;

export default function CreateRequestPage() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { token } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<RequestForm>({
        resolver: zodResolver(requestSchema),
        defaultValues: {
            category: 'furniture',
            city: 'Riyadh',
            quantity: 1,
            withInstallation: false,
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const uploadFiles = async (): Promise<string[]> => {
        if (selectedFiles.length === 0) return [];

        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('files', file));

        const res = await fetch('http://localhost:4000/storage/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) throw new Error('فشل رفع الصور');
        const data = await res.json();
        return data.urls;
    };

    const onSubmit = async (data: RequestForm) => {
        if (!token) {
            setError("يجب تسجيل الدخول لنشر طلب");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Upload images first
            const imageUrls = await uploadFiles();

            // Extract dimensions fields and rest of the data
            const { length, width, height, ...rest } = data;

            // Combine dimensions and images for the API
            const formattedData = {
                ...rest,
                dimensions: `${length}x${width}x${height} سم`,
                images: imageUrls
            };

            const res = await fetch('http://localhost:4000/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formattedData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'حدث خطأ أثناء نشر الطلب');
            }

            router.push(`/dashboard`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-12 px-4" dir="rtl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">إنشاء طلب تصنيع</h1>
                <p className="text-gray-500">أدخل تفاصيل الأثاث الذي ترغب في تصنيعه بدقة</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-[12px] mb-6 text-sm text-right">
                    {error}
                </div>
            )}

            <div className="mb-8 flex justify-between items-center max-w-md mx-auto relative px-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`flex-grow h-1 mx-2 z-0 transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <div className={`flex-grow h-1 mx-2 z-0 transition-colors ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
            </div>

            <div className="card p-8 md:p-10 shadow-xl border-0 overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6 text-right">المعلومات الأساسية</h2>

                            <div className="text-right">
                                <label className="block text-sm font-bold mb-2 text-gray-700">ماذا تريد أن تصنع؟</label>
                                <input {...register('title')} className="input-field text-right" placeholder="مثال: طقم كنب مجلس رجال" />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 text-right">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">التصنيف</label>
                                    <select {...register('category')} className="input-field text-right">
                                        <option value="furniture">أثاث منزلي</option>
                                        <option value="kitchen">مطابخ</option>
                                        <option value="office">أثاث مكتبي</option>
                                        <option value="decor">ديكورات خشبية</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">الكمية</label>
                                    <input type="number" {...register('quantity')} className="input-field text-right" />
                                </div>
                            </div>

                            <div className="text-right">
                                <label className="block text-sm font-bold mb-2 text-gray-700">وصف دقيق للمشروع</label>
                                <textarea {...register('description')} className="input-field h-32 text-right" placeholder="اذكر أدق التفاصيل لضمان جودة التصنيع..." />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                            </div>

                            <div className="text-right">
                                <label className="block text-sm font-bold mb-4 text-gray-700">ارفق صور للتوضيح</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-primary transition-colors bg-gray-50"
                                >
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-bold text-gray-600">اضغط لرفع الصور أو اسحبها هنا</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG حتى 10 صور</p>
                                </div>

                                {previews.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4 mt-6">
                                        {previews.map((url, i) => (
                                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border shadow-sm">
                                                <img src={url} alt="preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button type="button" onClick={() => setStep(2)} className="btn-primary w-full py-4 text-lg font-bold mt-4 shadow-lg shadow-blue-100">التالي</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6 text-right">المواصفات الفنية</h2>

                            <div className="text-right">
                                <label className="block text-sm font-bold mb-4 text-gray-700">الأبعاد المطلوبة (سم)</label>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                        <span className="text-[11px] text-gray-500 block text-center">الطول</span>
                                        <input type="number" {...register('length')} className="input-field text-center font-bold" placeholder="0" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[11px] text-gray-500 block text-center">العرض</span>
                                        <input type="number" {...register('width')} className="input-field text-center font-bold" placeholder="0" />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[11px] text-gray-500 block text-center">الارتفاع</span>
                                        <input type="number" {...register('height')} className="input-field text-center font-bold" placeholder="0" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 text-right">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">نوع الخامة</label>
                                    <input {...register('material')} className="input-field text-right" placeholder="مثال: خشب سويدي" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">اللون المفضل</label>
                                    <input {...register('color')} className="input-field text-right" placeholder="مثال: بني غامق" />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setStep(1)} className="border border-gray-300 px-6 py-3 rounded-[12px] font-bold text-gray-600 hover:bg-gray-50 flex-1">السابق</button>
                                <button type="button" onClick={() => setStep(3)} className="btn-primary py-3 flex-[2] text-lg font-bold shadow-lg shadow-blue-100">التالي</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6 text-right">التوصيل والميزانية</h2>

                            <div className="grid md:grid-cols-2 gap-6 text-right">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">المدينة</label>
                                    <select {...register('city')} className="input-field text-right">
                                        <option value="Riyadh">الرياض</option>
                                        <option value="Jeddah">جدة</option>
                                        <option value="Dammam">الدمام</option>
                                        <option value="Makkah">مكة المكرمة</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">الميزانية التقديرية (ريال)</label>
                                    <input type="number" {...register('budget')} className="input-field text-right" placeholder="مثال: 5000" />
                                </div>
                            </div>

                            <div className="text-right">
                                <label className="block text-sm font-bold mb-2 text-gray-700">موعد التسليم المرغوب</label>
                                <input type="date" {...register('deadline')} className="input-field text-right" />
                            </div>

                            <div className="bg-blue-50/50 p-6 rounded-2xl flex items-center justify-between border border-blue-100">
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-blue-900">خدمة التركيب</span>
                                    <span className="text-xs text-blue-600/70">هل ترغب في قيام المصنع بتركيب الأثاث؟</span>
                                </div>
                                <input type="checkbox" {...register('withInstallation')} className="w-6 h-6 rounded-lg accent-primary cursor-pointer" />
                            </div>

                            <div className="flex gap-4 pt-8 border-t border-gray-100">
                                <button type="button" onClick={() => setStep(2)} className="border border-gray-300 px-6 py-3 rounded-[12px] font-bold text-gray-600 hover:bg-gray-50 flex-1">السابق</button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary py-3 flex-[2] text-lg font-bold disabled:opacity-50 shadow-lg shadow-blue-100"
                                >
                                    {isSubmitting ? 'جاري الرفع والنشر...' : 'نشر الطلب الآن'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
