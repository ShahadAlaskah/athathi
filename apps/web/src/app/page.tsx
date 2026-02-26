'use client';

import Link from 'next/link';
import { useAuth } from './context/AuthContext';

export default function LandingPage() {
    const { user } = useAuth();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-right space-y-8" dir="rtl">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#111827] leading-tight">
                            حوّل أفكارك إلى <span className="text-primary">أثاث واقعي</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            منصة "أثاثي" تربطك بأفضل المصانع والنجارين في المملكة لتصنيع أثاثك المخصص بأعلى جودة وأفضل سعر.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {(!user || user.role === 'CLIENT') ? (
                                <Link href="/requests/create" className="btn-primary text-lg px-8 py-4">
                                    ابدأ طلبك الآن
                                </Link>
                            ) : (
                                <Link href="/requests" className="btn-primary text-lg px-8 py-4">
                                    تصفح الطلبات
                                </Link>
                            )}

                            {user?.role === 'PROVIDER' && (
                                <Link href="/dashboard" className="border border-gray-300 px-8 py-4 rounded-[8px] font-medium hover:bg-gray-50 transition-colors text-center inline-block">
                                    لوحة التحكم
                                </Link>
                            )}
                        </div>
                        <div className="flex items-center gap-8 pt-6">
                            <div className="text-right">
                                <div className="text-2xl font-bold">1000+</div>
                                <div className="text-gray-500 text-sm">طلب مكتمل</div>
                            </div>
                            <div className="border-r h-10 border-gray-200"></div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">250+</div>
                                <div className="text-gray-500 text-sm">مصنع مسجل</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-blue-50 rounded-[40px] overflow-hidden shadow-2xl">
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zm9-10v5h-2V9H9l3-3 3 3h-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 card p-4 w-48 animate-bounce">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <div className="text-sm font-bold text-gray-800">نشط الآن</div>
                            </div>
                            <div className="text-xs text-gray-500">جاري معالجة 12 عرضاً لطلب خزانة ملابس</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">كيف تعمل المنصة؟</h2>
                    <p className="text-gray-600">ثلاث خطوات بسيطة لتحصل على أثاثك</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                    {[
                        { step: "1", title: "أنشئ طلبك", desc: "أدخل التفاصيل والمقاسات والصور لقطع الأثاث التي تريد تصنيعها." },
                        { step: "2", title: "استقبل العروض", desc: "ستصلك عروض أسعار منافسة من مصانع ونجارين معتمدين حسب مدينتك." },
                        { step: "3", title: "اختر الأفضل", desc: "قارن بين العروض، تواصل عبر المحادثة الفورية، وادفع بأمان لبدء التصنيع." }
                    ].map((item, idx) => (
                        <div key={idx} className="card p-8 relative">
                            <div className="text-4xl font-black text-blue-100 absolute top-4 left-6">0{item.step}</div>
                            <h3 className="text-xl font-bold mb-4 relative text-right">{item.title}</h3>
                            <p className="text-gray-600 relative text-right">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
