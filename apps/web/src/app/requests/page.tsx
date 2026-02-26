'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ExploreRequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch('http://localhost:4000/requests');
                if (res.ok) {
                    const data = await res.json();
                    setRequests(data.items || []);
                }
            } catch (err) {
                console.error('Error fetching requests:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 text-right" dir="rtl">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">اكتشف المشاريع المتاحة</h1>
                <p className="text-gray-500 font-medium">تصفح طلبات التصنيع الحالية وقدم عروضك كمزود خدمة</p>
            </div>

            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="card p-6 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-3 bg-gray-100 rounded mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            ) : requests.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {requests.map((req) => (
                        <div key={req.id} className="card p-6 hover:shadow-lg transition-all flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-blue-50 text-primary text-xs font-bold px-2 py-1 rounded">
                                    {req.category === 'furniture' ? 'أثاث' : req.category}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(req.createdAt).toLocaleDateString('ar-SA')}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{req.title}</h3>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                                {req.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t text-sm">
                                <span className="text-gray-600">📍 {req.city}</span>
                                <Link href={`/requests/${req.id}`} className="text-primary font-bold hover:underline">
                                    عرض التفاصيل ←
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border p-20 text-center">
                    <p className="text-gray-500">لا توجد طلبات متاحة حالياً.</p>
                </div>
            )}
        </div>
    );
}
