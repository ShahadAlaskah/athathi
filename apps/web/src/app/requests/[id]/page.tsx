'use client';

import { useEffect, useState, use } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ChatBox from '../../components/ChatBox';

export default function RequestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { token, user, isLoading: authLoading } = useAuth();
    const [request, setRequest] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
    const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);
    const [openChatOfferId, setOpenChatOfferId] = useState<string | null>(null);
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [selectedOfferForAccept, setSelectedOfferForAccept] = useState<any>(null);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isAcceptedSuccess, setIsAcceptedSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'COD'>('CARD');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [offerForm, setOfferForm] = useState({
        price: '',
        estimatedDays: '',
        proposedMaterials: '',
        warrantyInfo: '',
        deliveryIncluded: true,
        paymentTerms: ''
    });

    const router = useRouter();

    const fetchRequest = async () => {
        try {
            const res = await fetch(`http://localhost:4000/requests/${id}`);
            if (!res.ok) throw new Error('فشل جلب تفاصيل الطلب');
            const data = await res.json();
            setRequest(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, [id]);

    const handleOfferSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;

        setIsSubmittingOffer(true);
        try {
            const res = await fetch('http://localhost:4000/offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    requestId: id,
                    price: Number(offerForm.price),
                    estimatedDays: Number(offerForm.estimatedDays),
                    proposedMaterials: offerForm.proposedMaterials,
                    warrantyInfo: offerForm.warrantyInfo,
                    deliveryIncluded: offerForm.deliveryIncluded,
                    paymentTerms: offerForm.paymentTerms
                })
            });

            if (res.ok) {
                setIsOfferModalOpen(false);
                fetchRequest(); // Refresh data
                alert('تم تقديم عرضك بنجاح');
            } else {
                const data = await res.json();
                alert(data.message || 'فشل تقديم العرض');
            }
        } catch (err) {
            alert('حدث خطأ أثناء تقديم العرض');
        } finally {
            setIsSubmittingOffer(false);
        }
    };

    const handleAcceptOffer = async () => {
        if (!token || !selectedOfferForAccept) return;

        setIsProcessingPayment(true);

        // Simulate payment gateway delay (1.5 seconds)
        setTimeout(async () => {
            setIsAccepting(true);
            try {
                const res = await fetch(`http://localhost:4000/offers/${selectedOfferForAccept.id}/accept`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    setIsAcceptedSuccess(true);
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 3000);
                } else {
                    const data = await res.json();
                    alert(data.message || 'فشل قبول العرض');
                    setIsAcceptModalOpen(false);
                }
            } catch (err) {
                alert('حدث خطأ أثناء قبول العرض');
                setIsAcceptModalOpen(false);
            } finally {
                setIsAccepting(false);
                setIsProcessingPayment(false);
            }
        }, paymentMethod === 'CARD' ? 2000 : 500);
    };

    if (authLoading || isLoading) return <div className="p-20 text-center animate-pulse text-xl">جاري التحميل...</div>;
    if (error || !request) return <div className="p-20 text-center text-red-500">{error || 'الطلب غير موجود'}</div>;

    const isOwner = user?.id === request.clientId;
    const isProvider = user?.role === 'PROVIDER';
    const hasAlreadyOffered = request.offers?.some((o: any) => o.userId === user?.id);

    const translateCity = (city: string) => {
        const CITIES: Record<string, string> = {
            'Riyadh': 'الرياض',
            'Jeddah': 'جدة',
            'Dammam': 'الدمام',
            'Mecca': 'مكة المكرمة',
            'Medina': 'المدينة المنورة',
            'Khobar': 'الخبر',
            'Abha': 'أبها',
        };
        return CITIES[city] || city;
    };

    const translateStatus = (status: string) => {
        const STATUSES: Record<string, string> = {
            'PENDING': 'قيد الانتظار',
            'ACCEPTED': 'تم القبول',
            'COMPLETED': 'مكتمل',
            'CANCELLED': 'ملغي',
        };
        return STATUSES[status] || status;
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4" dir="rtl">
            <div className="flex flex-col items-center gap-8">
                {/* Main Content */}
                <div className="w-full max-w-4xl space-y-8">
                    {/* Header Card */}
                    <div className="card p-8 border-0 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{request.title}</h1>
                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span>📍 {translateCity(request.city)}</span>
                                    <span>📅 نُشر في {new Date(request.createdAt).toLocaleDateString('ar-SA')}</span>
                                </div>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                request.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                    request.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {translateStatus(request.status)}
                            </span>
                        </div>

                        {/* Images Gallery */}
                        {request.images && request.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {request.images.map((img: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="aspect-square rounded-2xl overflow-hidden border bg-gray-50 cursor-zoom-in hover:opacity-90 transition-opacity"
                                        onClick={() => setSelectedImage(img.url)}
                                    >
                                        <img src={img.url} alt={`Furniture ${idx}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold mb-3 border-r-4 border-primary pr-3">وصف المشروع</h3>
                                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl text-right">
                                    {request.description}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4 text-right">
                                    <h3 className="text-lg font-bold border-r-4 border-primary pr-3">المواصفات الفنية</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">الأبعاد (طxعxا)</span>
                                            <span className="font-bold">{request.dimensions}</span>
                                        </div>
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">الخامة</span>
                                            <span className="font-bold">{request.material || 'غير محدد'}</span>
                                        </div>
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">اللون</span>
                                            <span className="font-bold">{request.color || 'غير محدد'}</span>
                                        </div>
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">الكمية</span>
                                            <span className="font-bold">{request.quantity} قطع</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 text-right">
                                    <h3 className="text-lg font-bold border-r-4 border-primary pr-3">التوصيل والتركيب</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">آخر موعد للتسليم</span>
                                            <span className="font-bold">{request.deadline ? new Date(request.deadline).toLocaleDateString('ar-SA') : 'مرن'}</span>
                                        </div>
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">خدمة التركيب</span>
                                            <span className={`font-bold ${request.withInstallation ? 'text-green-600' : 'text-orange-500'}`}>
                                                {request.withInstallation ? 'مطلوبة' : 'غير مطلوبة'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">الميزانية التقديرية</span>
                                            <span className="font-bold text-primary">{request.budget} ريال</span>
                                        </div>
                                        <div className="flex justify-between p-2 border-b">
                                            <span className="text-gray-500">صاحب الطلب</span>
                                            <span className="font-bold">{request.client?.fullName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Offers Section */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">العروض المقدمة ({request.offers?.length || 0})</h2>
                            {isProvider && !hasAlreadyOffered && (
                                <button
                                    onClick={() => setIsOfferModalOpen(true)}
                                    className="btn-primary px-6 py-2"
                                >
                                    قدم عرضك الآن
                                </button>
                            )}
                        </div>

                        {request.offers && request.offers.length > 0 ? (
                            <div className="grid gap-4">
                                {request.offers.map((offer: any) => (
                                    <div key={offer.id} className="card p-6 flex flex-col hover:shadow-md transition-shadow border-0 shadow-sm text-right">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-6">
                                            <div className="flex items-center gap-4">
                                                <Link href={`/providers/${offer.providerId}`} className="shrink-0 hover:opacity-80 transition-opacity">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                                        {offer.provider?.factoryName?.charAt(0)}
                                                    </div>
                                                </Link>
                                                <div>
                                                    <Link href={`/providers/${offer.providerId}`} className="hover:text-primary transition-colors">
                                                        <h3 className="font-bold text-lg text-gray-900">{offer.provider?.factoryName}</h3>
                                                    </Link>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span>⭐ {offer.provider?.rating}</span>
                                                        <span>•</span>
                                                        <span>المدة: {offer.estimatedDays} أيام</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-grow space-y-3 px-4 md:border-r md:border-l border-gray-100">
                                                {offer.proposedMaterials && (
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-bold text-gray-900 block mb-1 text-xs uppercase tracking-wider">الخامات والمواصفات:</span>
                                                        <p className="bg-gray-50 p-2 rounded-lg border border-gray-100 italic">{offer.proposedMaterials}</p>
                                                    </div>
                                                )}
                                                <div className="flex flex-wrap gap-2 text-[11px]">
                                                    {offer.warrantyInfo && (
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                                                            🛡️ الضمان: {offer.warrantyInfo}
                                                        </span>
                                                    )}
                                                    <span className={`px-2 py-1 rounded-full border flex items-center gap-1 ${offer.deliveryIncluded ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                                                        {offer.deliveryIncluded ? '🚚 يشمل التوصيل' : '❌ لا يشمل التوصيل'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-center md:text-left flex flex-col items-center md:items-end shrink-0 gap-3">
                                                <div className="text-2xl font-black text-primary">{offer.price} ريال</div>
                                                <div className="flex gap-2">
                                                    {(isOwner || offer.userId === user?.id) && (
                                                        <button
                                                            onClick={() => setOpenChatOfferId(openChatOfferId === offer.id ? null : offer.id)}
                                                            className={`p-2 rounded-xl transition-colors ${openChatOfferId === offer.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                                            title="فتح المحادثة"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    {isOwner && request.status !== 'ACCEPTED' && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedOfferForAccept(offer);
                                                                setIsAcceptModalOpen(true);
                                                                setIsAcceptedSuccess(false);
                                                            }}
                                                            className="btn-primary px-6 py-2 text-sm shadow-lg shadow-blue-100"
                                                        >
                                                            قبول العرض
                                                        </button>
                                                    )}
                                                    {isOwner && request.status === 'ACCEPTED' && offer.status === 'ACCEPTED' && (
                                                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full self-center">العرض المقبول</span>
                                                    )}
                                                    {!isOwner && offer.userId === user?.id && (
                                                        <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full self-center">عرضك</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Chat Overlay inside Offer Card */}
                                        {openChatOfferId === offer.id && (
                                            <ChatBox offerId={offer.id} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-100">
                                <p className="text-gray-400">لا توجد عروض مقدمة حتى الآن.</p>
                                {isProvider && !hasAlreadyOffered && (
                                    <button
                                        onClick={() => setIsOfferModalOpen(true)}
                                        className="btn-primary mt-4 px-8"
                                    >
                                        قدم عرضك الآن
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal (Lightbox) */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 transition-all animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 left-6 text-white hover:text-gray-300 transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="Full size"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            {/* Offer Submission Modal */}
            {isOfferModalOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-900">تقديم عرض سعر</h3>
                            <button onClick={() => setIsOfferModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleOfferSubmit} className="p-6 space-y-4 text-right">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">السعر (ريال)</label>
                                    <input
                                        type="number"
                                        required
                                        className="input-field"
                                        placeholder="0.00"
                                        value={offerForm.price}
                                        onChange={(e) => setOfferForm({ ...offerForm, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">مدة التنفيذ (أيام)</label>
                                    <input
                                        type="number"
                                        required
                                        className="input-field"
                                        placeholder="7"
                                        value={offerForm.estimatedDays}
                                        onChange={(e) => setOfferForm({ ...offerForm, estimatedDays: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">الخامات المقترحة</label>
                                <textarea
                                    className="input-field h-24 pt-3"
                                    placeholder="اذكر نوع الخشب، القماش، أو أي تفاصيل تقنية..."
                                    value={offerForm.proposedMaterials}
                                    onChange={(e) => setOfferForm({ ...offerForm, proposedMaterials: e.target.value })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">معلومات الضمان</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="مثلاً: سنتين على الهيكل"
                                    value={offerForm.warrantyInfo}
                                    onChange={(e) => setOfferForm({ ...offerForm, warrantyInfo: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center gap-2 py-2">
                                <input
                                    type="checkbox"
                                    id="delivery"
                                    className="w-4 h-4 rounded text-primary"
                                    checked={offerForm.deliveryIncluded}
                                    onChange={(e) => setOfferForm({ ...offerForm, deliveryIncluded: e.target.checked })}
                                />
                                <label htmlFor="delivery" className="text-sm font-medium text-gray-600">السعر يشمل التوصيل</label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmittingOffer}
                                className="btn-primary w-full py-4 text-lg mt-4 disabled:opacity-50"
                            >
                                {isSubmittingOffer ? 'جاري التقديم...' : 'تأكيد تقديم العرض'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Offer Acceptance Confirmation Modal */}
            {isAcceptModalOpen && selectedOfferForAccept && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative flex flex-col my-auto border border-white/20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {!isAcceptedSuccess ? (
                            <>
                                <div className="p-8 text-center bg-gray-50/50 border-b border-gray-100">
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">تأكيد قبول العرض</h3>
                                    <p className="text-gray-500">أنت على وشك البدء في عملية الإنتاج مع {selectedOfferForAccept.provider?.factoryName}</p>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100/50 space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500 font-bold">قيمة العرض النهائية</span>
                                            <span className="text-xl font-black text-primary">{selectedOfferForAccept.price} ريال</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-t border-blue-100 pt-4">
                                            <span className="text-gray-500 font-bold">مدة التنفيذ المتوقعة</span>
                                            <span className="font-black text-gray-900">{selectedOfferForAccept.estimatedDays} أيام</span>
                                        </div>
                                    </div>

                                    {/* Payment Selection */}
                                    <div className="space-y-3">
                                        <p className="text-sm font-bold text-gray-900 text-right">طريقة الدفع</p>
                                        <div className="grid grid-cols-2 gap-3" dir="rtl">
                                            <button
                                                onClick={() => setPaymentMethod('CARD')}
                                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'CARD' ? 'border-primary bg-blue-50/50 scale-[1.02] shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                                            >
                                                <span className="text-2xl">💳</span>
                                                <span className={`text-sm font-bold ${paymentMethod === 'CARD' ? 'text-primary' : 'text-gray-600'}`}>الدفع الإلكتروني</span>
                                            </button>

                                            <button
                                                onClick={() => setPaymentMethod('COD')}
                                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'COD' ? 'border-primary bg-blue-50/50 scale-[1.02] shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                                            >
                                                <span className="text-2xl">💵</span>
                                                <span className={`text-sm font-bold ${paymentMethod === 'COD' ? 'text-primary' : 'text-gray-600'}`}>الدفع عند الاستلام</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Payment Simulator Form (Mock) */}
                                    {paymentMethod === 'CARD' && (
                                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-right animate-in fade-in slide-in-from-top-2 duration-300">
                                            <input type="text" placeholder="رقم البطاقة (0000 0000 0000 0000)" className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input type="text" placeholder="تاريخ الانتهاء (MM/YY)" className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                                <input type="text" placeholder="الرمز (CVC)" className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'COD' && (
                                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-right animate-in fade-in slide-in-from-top-2 duration-300 flex items-start gap-3">
                                            <span className="text-xl">🚚</span>
                                            <p className="text-sm font-medium text-green-800 leading-relaxed">ستقوم بدفع الدفعة الأولى أو كامل المبلغ إلى المصنع أو شركة الشحن عند استلام الأثاث في موقعك.</p>
                                        </div>
                                    )}

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setIsAcceptModalOpen(false)}
                                            className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-100 transition-all border border-gray-100"
                                            disabled={isProcessingPayment}
                                        >
                                            تراجع
                                        </button>
                                        <button
                                            onClick={handleAcceptOffer}
                                            disabled={isProcessingPayment}
                                            className="flex-[2] btn-primary py-4 text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
                                        >
                                            {isProcessingPayment ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>{paymentMethod === 'CARD' ? 'جاري الدفع...' : 'جاري التأكيد...'}</span>
                                                </div>
                                            ) : (
                                                paymentMethod === 'CARD' ? 'دفع وتأكيد الطلب' : 'تأكيد الطلب الآن'
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-400 text-center">بضغطك على تأكيد، فأنك توافق على شروط وأحكام منصة أثاثي الخاصة بالتعاقد والإنتاج.</p>
                                </div>
                            </>
                        ) : (
                            <div className="p-12 text-center animate-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-4">مبروك! تم قبول العرض</h3>
                                <p className="text-gray-500 leading-relaxed mb-8">
                                    لقد قمت باختيار {selectedOfferForAccept.provider?.factoryName} لتنفيذ مشروعك.
                                    <br />
                                    سيتم إرسال إشعار للمصنع فوراً للبدء.
                                </p>
                                <div className="p-4 bg-green-50 text-green-700 rounded-2xl text-sm font-bold border border-green-100">
                                    جاري توجيهك لصفحة طلباتي لمتابعة التنفيذ...
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
