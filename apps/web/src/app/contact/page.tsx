import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-10 text-center">تواصل معنا</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">معلومات التواصل</h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 text-gray-600">
                            <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <span>المملكة العربية السعودية<br />الرياض، طريق الملك فهد</span>
                        </li>
                        <li className="flex items-center gap-4 text-gray-600">
                            <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <span dir="ltr">+966 50 123 4567</span>
                        </li>
                        <li className="flex items-center gap-4 text-gray-600">
                            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <span className="font-sans">support@athathi.sa</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">أرسل لنا رسالة</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">الاسم</label>
                            <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                            <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">الرسالة</label>
                            <textarea rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-50"></textarea>
                        </div>
                        <button type="button" className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold hover:bg-blue-700 transition">
                            إرسال
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
