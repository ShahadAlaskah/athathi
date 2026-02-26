'use client';
import { MessageSquare, CheckCircle, X, Send } from 'lucide-react';
import { useState } from 'react';

export default function AdminSupport() {
    const [tickets, setTickets] = useState([
        { id: "#TCK-102", subject: "تأخر تسليم طلب", user: "عميل - خالد", status: "مفتوح", messages: [{ sender: 'خالد', text: 'السلام عليكم، المصنع تأخر يومين عن موعد التسليم المتفق عليه، هل يمكنكم التدخل؟' }] },
        { id: "#TCK-101", subject: "مشكلة في السحب المالي", user: "مزود - مصنع السلام", status: "مغلق", messages: [{ sender: 'مصنع السلام', text: 'حولت الأرباح ولم تصل حسابي البنكي' }] },
    ]);

    const [toast, setToast] = useState<string | null>(null);
    const [activeChat, setActiveChat] = useState<any>(null);
    const [replyMsg, setReplyMsg] = useState("");

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleReply = (tck: any) => {
        setActiveChat(tck);
    };

    const sendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyMsg.trim()) return;

        const updatedChat = { ...activeChat, messages: [...activeChat.messages, { sender: 'الدعم الفني', text: replyMsg }] };
        setActiveChat(updatedChat);
        setTickets(tickets.map(t => t.id === activeChat.id ? updatedChat : t));
        setReplyMsg("");
        showToast("تم الإرسال بنجاح");
    };

    const handleClose = (id: string) => {
        if (confirm('هل أنت متأكد من إغلاق هذه التذكرة؟')) {
            setTickets(tickets.map(t => t.id === id ? { ...t, status: 'مغلق' } : t));
            if (activeChat?.id === id) setActiveChat({ ...activeChat, status: 'مغلق' });
            showToast("تم إغلاق التذكرة بنجاح");
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

            {activeChat && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]" dir="rtl">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="font-bold text-lg">{activeChat.subject}</h3>
                                <p className="text-sm text-gray-500">{activeChat.user}</p>
                            </div>
                            <button onClick={() => setActiveChat(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 min-h-[300px]">
                            {activeChat.messages.map((m: any, idx: number) => (
                                <div key={idx} className={`flex flex-col ${m.sender === 'الدعم الفني' ? 'items-end' : 'items-start'}`}>
                                    <span className="text-xs text-gray-500 mb-1 mx-2">{m.sender}</span>
                                    <div className={`px-4 py-2 rounded-2xl max-w-[85%] ${m.sender === 'الدعم الفني' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-gray-800 rounded-bl-none'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {activeChat.status === 'مفتوح' ? (
                            <form onSubmit={sendReply} className="p-4 border-t flex gap-2 bg-white">
                                <input required value={replyMsg} onChange={e => setReplyMsg(e.target.value)} placeholder="اكتب ردك هنا..." className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <button type="submit" className="bg-blue-600 text-white w-10 h-10 rounded-full flex justify-center items-center flex-shrink-0 hover:bg-blue-700 transition">
                                    <Send className="w-4 h-4 ml-1" />
                                </button>
                            </form>
                        ) : (
                            <div className="p-4 border-t text-center text-sm font-medium text-gray-500 bg-gray-50">التذكرة مغلقة للحوار.</div>
                        )}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-900">تذاكر الدعم الفني</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-gray-600">رقم التذكرة</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">الموضوع</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">المستخدم</th>
                            <th className="py-4 px-6 font-semibold text-gray-600">الحالة</th>
                            <th className="py-4 px-6 font-semibold text-gray-600 text-center">رد</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tickets.map((tck, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 font-mono text-gray-500">{tck.id}</td>
                                <td className="py-4 px-6 font-medium text-gray-900">{tck.subject}</td>
                                <td className="py-4 px-6 text-gray-600">{tck.user}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${tck.status === 'مفتوح' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {tck.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-center items-center gap-3">
                                        <button onClick={() => handleReply(tck)} className="text-gray-400 hover:text-blue-600 transition" title="فتح المحادثة والرد">
                                            <MessageSquare className="w-5 h-5" />
                                        </button>
                                        {tck.status === 'مفتوح' && (
                                            <button onClick={() => handleClose(tck.id)} className="text-gray-400 hover:text-green-600 transition" title="إغلاق التذكرة">
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
