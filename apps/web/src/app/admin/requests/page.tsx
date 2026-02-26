'use client';
import { Search, Eye, Trash2, ShieldAlert, X, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AdminRequests() {
    const [requests, setRequests] = useState([
        { id: "#REQ-0932", title: "تفصيل خزانة ملابس", client: "خالد", city: "Riyadh", status: "PENDING", flags: 0 },
        { id: "#REQ-0931", title: "طقم كنب زاوية", client: "نورة", city: "Jeddah", status: "ACCEPTED", flags: 1 },
        { id: "#REQ-0930", title: "سرير مزدوج", client: "فهد", city: "Dammam", status: "CANCELLED", flags: 3 },
    ]);

    const translateStatus = (status: string) => {
        const STATUSES: Record<string, string> = {
            'PENDING': 'قيد الانتظار',
            'ACCEPTED': 'تم القبول',
            'COMPLETED': 'مكتمل',
            'CANCELLED': 'ملغي',
        };
        return STATUSES[status] || status;
    };

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

    const [toast, setToast] = useState<string | null>(null);
    const [viewingReq, setViewingReq] = useState<any>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleView = (req: any) => {
        setViewingReq(req);
    };

    const handleDelete = (id: string) => {
        if (confirm('هل أنت متأكد من حذف هذا الطلب نهائياً من المنصة؟')) {
            setRequests(requests.filter(req => req.id !== id));
            showToast('تم الحذف بنجاح');
        }
    };

    return (
        <div className="space-y-6 relative">
            {toast && (
                <div className="fixed bottom-10 left-10 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    {toast}
                </div>
            )}

            {viewingReq && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" dir="rtl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg">تفاصيل الطلب {viewingReq.id}</h3>
                            <button onClick={() => setViewingReq(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p><strong>العنوان:</strong> {viewingReq.title}</p>
                            <p><strong>العميل:</strong> {viewingReq.client}</p>
                            <p><strong>المدينة:</strong> 📍 {translateCity(viewingReq.city)}</p>
                            <p><strong>الحالة:</strong> <span className={`px-2 py-1 rounded-full text-xs font-bold ${viewingReq.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : viewingReq.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{translateStatus(viewingReq.status)}</span></p>
                            <p><strong>عدد الإبلاغات:</strong> {viewingReq.flags}</p>
                            <div className="pt-4 flex gap-3">
                                <button onClick={() => setViewingReq(null)} className="bg-gray-100 text-gray-700 w-full px-4 py-2 rounded-lg font-medium">إغلاق</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-900">إدارة الطلبات</h1>
                <div className="relative w-72">
                    <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="البحث عن طلب..." className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-gray-600">رقم الطلب</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">العنوان</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">العميل</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">المدينة</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">الحالة</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">الإبلاغات</th>
                            <th className="py-4 px-6 font-semibold text-gray-600 text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {requests.map((req, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 font-mono text-gray-500">{req.id}</td>
                                <td className="py-4 px-6 font-medium text-gray-900">{req.title}</td>
                                <td className="py-4 px-6 text-gray-600">{req.client}</td>
                                <td className="py-4 px-6 text-gray-500">{translateCity(req.city)}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : req.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {translateStatus(req.status)}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    {req.flags > 0 ? (
                                        <div className="flex items-center gap-1 text-orange-600 text-xs font-bold">
                                            <ShieldAlert className="w-4 h-4" /> {req.flags} بلاغ
                                        </div>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-center items-center gap-3">
                                        <button onClick={() => handleView(req)} className="text-gray-400 hover:text-blue-600 transition" title="عرض التفاصيل"><Eye className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(req.id)} className="text-gray-400 hover:text-red-600 transition" title="حذف الطلب"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {requests.length === 0 && (
                            <tr><td colSpan={7} className="py-8 text-center text-gray-500">لا يوجد طلبات حالياً</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
