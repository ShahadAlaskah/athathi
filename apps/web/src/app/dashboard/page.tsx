'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, token, logout, isLoading } = useAuth();
    const router = useRouter();

    // Client state
    const [requests, setRequests] = useState<any[]>([]);

    // Provider state
    const [offers, setOffers] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!token || !user) return;
            setIsFetching(true);

            try {
                if (user.role === 'CLIENT') {
                    const res = await fetch('http://localhost:4000/requests/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) setRequests(await res.json());
                } else if (user.role === 'PROVIDER') {
                    // Fetch provider offers
                    const offRes = await fetch('http://localhost:4000/offers/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (offRes.ok) setOffers(await offRes.json());

                    // Fetch provider stats
                    const statRes = await fetch('http://localhost:4000/offers/me/stats', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (statRes.ok) setStats(await statRes.json());
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setIsFetching(false);
            }
        };

        if (token && user) {
            fetchData();
        }
    }, [token, user]);

    if (isLoading || !user) return <div className="p-20 text-center animate-pulse text-xl">جاري التحميل...</div>;

    const isProvider = user.role === 'PROVIDER';

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 text-right" dir="rtl">
            {/* Header */}
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">مرحباً، {user.fullName}</h1>
                    <p className="text-gray-500 mt-1">
                        {isProvider ? 'إليك ملخص العروض والمشاريع القائمة' : 'إليك ملخص نشاطك في أثاثي'}
                    </p>
                </div>
                <div className="flex gap-4">
                    {isProvider ? (
                        <Link href="/requests" className="btn-primary px-6 py-2">
                            تصفح الطلبات
                        </Link>
                    ) : (
                        <Link href="/requests/create" className="btn-primary px-6 py-2">
                            طلب جديد
                        </Link>
                    )}
                    <button
                        onClick={logout}
                        className="px-6 py-2 border border-red-200 text-red-500 rounded-btn hover:bg-red-50 transition-all font-medium"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {isProvider ? (
                    <>
                        <div className="card p-6 border-r-4 border-r-primary">
                            <h3 className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">إجمالي العروض</h3>
                            <div className="text-4xl font-bold text-primary">{stats?.total || 0}</div>
                        </div>
                        <div className="card p-6 border-r-4 border-r-success">
                            <h3 className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">عروض مقبولة</h3>
                            <div className="text-4xl font-bold text-success">{stats?.accepted || 0}</div>
                        </div>
                        <div className="card p-6 border-r-4 border-r-blue-500">
                            <h3 className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">إجمالي الأرباح</h3>
                            <div className="text-4xl font-bold text-blue-600">{stats?.totalValue || 0} ر.س</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="card p-6 border-r-4 border-r-primary">
                            <h3 className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">طلباتك الحالية</h3>
                            <div className="text-4xl font-bold text-primary">{requests.length}</div>
                        </div>
                        <div className="card p-6 border-r-4 border-r-success">
                            <h3 className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">العروض المستلمة</h3>
                            <div className="text-4xl font-bold text-success">
                                {requests.reduce((acc, req) => acc + (req._count?.offers || 0), 0)}
                            </div>
                        </div>
                        <div className="card p-6 border-r-4 border-r-warning">
                            <h3 className="text-gray-500 text-sm mb-1 uppercase tracking-wider font-semibold">رسائل جديدة</h3>
                            <div className="text-4xl font-bold text-warning">0</div>
                        </div>
                    </>
                )}
            </div>

            {/* Main Content List */}
            <h2 className="text-2xl font-bold mb-6">
                {isProvider ? 'آخر العروض المقدمة' : 'طلباتك'}
            </h2>

            {isFetching ? (
                <div className="p-10 text-center text-gray-400">جاري التحميل...</div>
            ) : isProvider ? (
                // Provider's Offers List
                offers.length > 0 ? (
                    <div className="grid gap-4">
                        {offers.map((offer) => (
                            <div key={offer.id} className="card p-6 flex justify-between items-center hover:shadow-md transition-shadow">
                                <div className="flex gap-6 items-center">
                                    <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center font-bold">
                                        {offer.price}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{offer.request?.title}</h3>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span>📍 {offer.request?.city}</span>
                                            <span>📅 {new Date(offer.createdAt).toLocaleDateString('ar-SA')}</span>
                                            <span className="text-blue-600 font-bold">{offer.estimatedDays} أيام تنفيـذ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${offer.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                                            offer.status === 'ACCEPTED' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        {offer.status === 'PENDING' ? 'قيد المراجعة' :
                                            offer.status === 'ACCEPTED' ? 'تم القبول' : 'مرفوض'}
                                    </span>
                                    <Link href={`/requests/${offer.request?.id}`} className="text-primary font-bold hover:underline">
                                        عرض الطلب
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[12px] border border-dashed border-gray-300 p-24 text-center">
                        <div className="max-w-xs mx-auto">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">لم تقدم أي عروض بعد</h4>
                            <p className="text-gray-500 text-sm mb-6">تصفح طلبات العملاء الآن وقدم أول عرض سعر لك</p>
                            <Link href="/requests" className="btn-primary w-full py-3 inline-block">
                                تصفح الطلبات
                            </Link>
                        </div>
                    </div>
                )
            ) : (
                // Client's Requests List
                requests.length > 0 ? (
                    <div className="grid gap-4">
                        {requests.map((req) => (
                            <div key={req.id} className="card p-6 flex justify-between items-center hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{req.title}</h3>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span>📍 {req.city}</span>
                                        <span>📅 {new Date(req.createdAt).toLocaleDateString('ar-SA')}</span>
                                        <span className="text-primary font-bold">{req._count?.offers || 0} عروض</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                                            req.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                                        }`}>
                                        {req.status === 'PENDING' ? 'قيد الانتظار' : req.status}
                                    </span>
                                    <Link href={`/requests/${req.id}`} className="text-primary font-bold hover:underline">
                                        التفاصيل
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[12px] border border-dashed border-gray-300 p-24 text-center">
                        <div className="max-w-xs mx-auto">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">لا توجد طلبات بعد</h4>
                            <p className="text-gray-500 text-sm mb-6">ابدأ بإنشاء أول طلب لتصلك عروض الأسعار من المصانع</p>
                            <Link href="/requests/create" className="btn-primary w-full py-3 inline-block">
                                إنشاء طلب جديد
                            </Link>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
