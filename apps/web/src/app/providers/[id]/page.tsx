'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function ProviderProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [provider, setProvider] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const res = await fetch(`http://localhost:4000/providers/${id}`);
                if (!res.ok) throw new Error('فشل جلب بيانات مقدم الخدمة');
                const data = await res.json();
                setProvider(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProvider();
    }, [id]);

    if (isLoading) return <div className="p-20 text-center animate-pulse text-xl">جاري التحميل...</div>;
    if (error || !provider) return <div className="p-20 text-center text-red-500">{error || 'مقدم الخدمة غير موجود'}</div>;

    return (
        <div className="max-w-5xl mx-auto py-12 px-4" dir="rtl">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Right Column: Profile Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card p-8 text-center border-0 shadow-sm">
                        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4">
                            {provider.factoryName.charAt(0)}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{provider.factoryName}</h1>
                        <p className="text-gray-500 text-sm mb-4">📍 {provider.city}</p>

                        <div className="flex justify-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(provider.rating) ? "text-yellow-400" : "text-gray-200"}>
                                    ⭐
                                </span>
                            ))}
                            <span className="text-sm font-bold mr-2">{provider.rating}</span>
                        </div>

                        {provider.isVerified && (
                            <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 py-2 rounded-xl text-sm font-bold">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                هوية موثقة
                            </div>
                        )}
                    </div>

                    <div className="card p-6 border-0 shadow-sm space-y-4">
                        <h3 className="font-bold text-gray-900 border-r-4 border-primary pr-3">إحصائيات</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-black text-primary">{provider._count.orders}</div>
                                <div className="text-xs text-gray-500">مشاريع مكتملة</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl text-center">
                                <div className="text-2xl font-black text-primary">{provider._count.offers}</div>
                                <div className="text-xs text-gray-500">عروض مقدمة</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Column: Bio & Recent Work */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="card p-8 border-0 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-r-4 border-primary pr-3">عن المصنع / الورشة</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {provider.bio || "لا يوجد وصف متوفر حالياً لهذا المقدم."}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 border-r-4 border-primary pr-3">آخر العروض المقدمة</h3>
                        <div className="grid gap-4">
                            {provider.offers.map((offer: any) => (
                                <div key={offer.id} className="card p-6 border-0 shadow-sm flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{offer.request.title}</h4>
                                        <p className="text-xs text-gray-500">📍 {offer.request.city} • {new Date(offer.createdAt).toLocaleDateString('ar-SA')}</p>
                                    </div>
                                    <div className="text-primary font-black">
                                        {offer.price} ريال
                                    </div>
                                </div>
                            ))}
                            {provider.offers.length === 0 && (
                                <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border-2 border-dashed">
                                    لا توجد عروض سابقة متاحة.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
