'use client';
import { Plus, Edit, Trash2, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminAds() {
    const [ads, setAds] = useState([
        { id: 1, title: "خصم الصيف للمصانع", status: "نشط", clicks: 342 },
        { id: 2, title: "التسجيل كمزود أثاث", status: "متوقف", clicks: 1210 },
    ]);

    const [toast, setToast] = useState<string | null>(null);
    const [editingAd, setEditingAd] = useState<any>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleAdd = () => {
        setEditingAd({ id: Date.now(), title: '', status: 'نشط', clicks: 0, isNew: true });
    };

    const handleEdit = (ad: any) => {
        setEditingAd({ ...ad, isNew: false });
    };

    const saveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAd.isNew) {
            setAds([...ads, { ...editingAd, id: Date.now() }]);
            showToast('تمت إضافة الإعلان بنجاح');
        } else {
            setAds(ads.map(a => a.id === editingAd.id ? editingAd : a));
            showToast('تم حفظ التعديلات');
        }
        setEditingAd(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
            setAds(ads.filter(ad => ad.id !== id));
            showToast('تم مسح الإعلان بنجاح!');
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

            {editingAd && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" dir="rtl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg">{editingAd.isNew ? 'إضافة إعلان' : 'تعديل الإعلان'}</h3>
                            <button onClick={() => setEditingAd(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={saveEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">الموضوع (العنوان)</label>
                                <input required value={editingAd.title} onChange={e => setEditingAd({ ...editingAd, title: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">الحالة</label>
                                <select value={editingAd.status} onChange={e => setEditingAd({ ...editingAd, status: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                                    <option>نشط</option>
                                    <option>متوقف</option>
                                </select>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex-1">حفظ</button>
                                <button type="button" onClick={() => setEditingAd(null)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex-1">إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-900">إدارة الإعلانات</h1>
                <button onClick={handleAdd} className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" /> إضافة إعلان
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ads.map((ad) => (
                    <div key={ad.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-2 py-1 rounded-md text-xs font-semibold ${ad.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {ad.status}
                                </span>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <button onClick={() => handleEdit(ad)} className="hover:text-blue-600 transition"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(ad.id)} className="hover:text-red-600 transition"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{ad.title}</h3>
                            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-4">صورة الإعلان</div>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="text-sm text-gray-500">النقرات</span>
                            <span className="font-bold text-gray-900">{ad.clicks}</span>
                        </div>
                    </div>
                ))}
                {ads.length === 0 && (
                    <div className="col-span-full py-8 text-center text-gray-500">لا يوجد إعلانات حالياً</div>
                )}
            </div>
        </div>
    );
}
