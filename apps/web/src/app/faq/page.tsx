export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold mb-10 text-center">الأسئلة الشائعة</h1>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-2">كيف أبدأ في طلب أثاث؟</h3>
                    <p className="text-gray-600">يمكنك البدء بإنشاء طلب جديد وإضافة الوصف والتفاصيل والمقاسات والصور التوضيحية.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-2">هل المصانع في المنصة موثوقة؟</h3>
                    <p className="text-gray-600">نعم، جميع المصانع والنجارين مسجلين في المنصة ويتم مراجعة طلبات الانضمام لضمان الجودة.</p>
                </div>
            </div>
        </div>
    );
}
