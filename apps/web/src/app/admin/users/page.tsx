'use client';
import { Search, Edit, Trash2, CheckCircle, XCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminUsers() {
    const [users, setUsers] = useState([
        { id: 1, name: "أحمد عبدالله", email: "ahmad@example.com", role: "عميل", status: "نشط" },
        { id: 2, name: "مصنع الخشب الراقي", email: "factory@wood.sa", role: "مزود خدمة", status: "نشط" },
        { id: 3, name: "خالد محمد", email: "khalid2@test.com", role: "عميل", status: "محظور" },
    ]);

    const [toast, setToast] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<any>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
            setUsers(users.filter(u => u.id !== id));
            showToast('تم حذف المستخدم بنجاح');
        }
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
    };

    const saveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
        setEditingUser(null);
        showToast('تم تحديث بيانات المستخدم بنجاح');
    };

    return (
        <div className="space-y-6 relative">
            {toast && (
                <div className="fixed bottom-10 left-10 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    {toast}
                </div>
            )}

            {editingUser && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" dir="rtl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg">تعديل المستخدم</h3>
                            <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={saveEdit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">الاسم</label>
                                <input value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">الدور</label>
                                <select value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                                    <option>عميل</option>
                                    <option>مزود خدمة</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">الحالة</label>
                                <select value={editingUser.status} onChange={e => setEditingUser({ ...editingUser, status: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                                    <option>نشط</option>
                                    <option>محظور</option>
                                </select>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex-1">حفظ التغييرات</button>
                                <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex-1">إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-900">إدارة المستخدمين</h1>
                <div className="relative w-72">
                    <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="البحث عن مستخدم بالاسم أو الإيميل..." className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-gray-600">الاسم</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">البريد الإلكتروني</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">الدور</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">الحالة</th>
                            <th className="py-4 px-6 font-semibold text-gray-600 text-center">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 font-medium text-gray-900">{u.name}</td>
                                <td className="py-4 px-6 text-gray-500">{u.email}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${u.role === 'مزود خدمة' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    {u.status === 'نشط' ? (
                                        <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                                            <CheckCircle className="w-4 h-4" /> نشط
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-red-600 text-xs font-bold">
                                            <XCircle className="w-4 h-4" /> محظور
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-center items-center gap-3">
                                        <button onClick={() => handleEdit(u)} className="text-gray-400 hover:text-blue-600 transition" title="تعديل"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(u.id)} className="text-gray-400 hover:text-red-600 transition" title="حذف"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan={5} className="py-8 text-center text-gray-500">لا يوجد مستخدمين حالياً</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
