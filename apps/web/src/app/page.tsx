'use client';

import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { ArrowLeft, Shield, Clock, Wrench, Star, CheckCircle, Store, Users, Sofa, Brush } from 'lucide-react';

export default function LandingPage() {
    const { user } = useAuth();

    return (
        <div className="bg-white selection:bg-blue-100 selection:text-blue-900 font-['IBM_Plex_Sans_Arabic'] min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-28 pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-400 opacity-10 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div className="text-right space-y-8 z-10" dir="rtl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 text-sm font-medium mb-4 backdrop-blur-sm">
                                <SparklesIcon className="w-4 h-4" />
                                <span>المنصة الأولى لتصنيع الأثاث في المملكة</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.2]">
                                صمم أثاثك، <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">نحن نصنعه لك</span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                منصة "أثاثي" تربطك بأمهر النجارين وأفضل المصانع الموثوقة لتنفيذ تصاميمك المخصصة بأعلى معايير الجودة، وبأسعار تنافسية.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                {(!user || user.role === 'CLIENT') ? (
                                    <Link href="/requests/create" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-bold rounded-xl overflow-hidden hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-500/30">
                                        <span className="relative z-10">ابدأ طلبك الآن</span>
                                        <ArrowLeft className="w-5 h-5 relative z-10 group-hover:-translate-x-1 transition-transform" />
                                        <div className="absolute inset-0 h-full w-full object-cover scale-[2.0] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                    </Link>
                                ) : (
                                    <Link href="/requests" className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
                                        تصفح الطلبات
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    </Link>
                                )}

                                {user?.role === 'PROVIDER' && (
                                    <Link href="/dashboard" className="px-8 py-4 bg-white text-gray-800 text-lg font-bold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                                        لوحة التحكم
                                    </Link>
                                )}
                                {(!user) && (
                                    <Link href="/register?role=provider" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 text-lg font-bold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                                        سجل كمصنع
                                        <Store className="w-5 h-5 text-gray-400" />
                                    </Link>
                                )}
                            </div>

                            <div className="flex items-center gap-10 pt-8 border-t border-gray-200/60 mt-8">
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-gray-900">+5000</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 mt-1">طلب مكتمل</div>
                                </div>
                                <div className="w-px h-12 bg-gray-200"></div>
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-gray-900">+300</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 mt-1">مصنع معتمد</div>
                                </div>
                                <div className="w-px h-12 bg-gray-200"></div>
                                <div>
                                    <div className="flex gap-1 text-yellow-400 mb-1">
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">تقييم العملاء رضى 4.9/5</div>
                                </div>
                            </div>
                        </div>

                        {/* Image/Graphics */}
                        <div className="relative hidden lg:block">
                            {/* Main Image Base */}
                            <div className="relative z-10 w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-50 shadow-2xl shadow-blue-900/10 border-8 border-white group">
                                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors duration-700"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sofa className="w-48 h-48 text-blue-200 drop-shadow-md group-hover:scale-110 transition-transform duration-700" />
                                </div>

                                {/* Floating Badges */}
                                <div className="absolute top-12 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 animate-bounce cursor-pointer hover:scale-105 transition-transform" style={{ animationDuration: '3s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">تم التسليم!</div>
                                            <div className="text-xs text-gray-500">طقم كنب زاوية</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-16 -left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 cursor-pointer hover:scale-105 transition-transform" style={{ animationDuration: '4s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <Store className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">مصنع الخشب الراقي</div>
                                            <div className="text-xs text-blue-600 font-medium tracking-wide">أرسل عرضاً جديداً</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] transform rotate-3 scale-105 -z-10 opacity-20 blur-xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features (How it Works) */}
            <section className="py-24 bg-white relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-blue-600 font-bold tracking-wider text-sm uppercase">آلية العمل</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">كيف تحول فكرتك إلى واقع؟</h3>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">خطوات بسيطة وسريعة لتصميم وتنفيذ أثاثك عبر منصتنا بكل أمان وموثوقية.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[45%] left-10 right-10 h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10"></div>

                        {[
                            {
                                id: "1",
                                icon: <Brush className="w-8 h-8 text-blue-600" />,
                                title: "ارفع فكرتك",
                                desc: "أضف صور، مقاسات، وتفاصيل الأثاث الذي ترغب بتصنيعه في طلب جديد.",
                                bg: "bg-blue-50", border: "border-blue-100"
                            },
                            {
                                id: "2",
                                icon: <Store className="w-8 h-8 text-purple-600" />,
                                title: "استقبل وقارن العروض",
                                desc: "سيقدم لك المصنعون عروض أسعار تنافسية. قارن التقييمات والسعر واختر الأنسب.",
                                bg: "bg-purple-50", border: "border-purple-100"
                            },
                            {
                                id: "3",
                                icon: <Wrench className="w-8 h-8 text-green-600" />,
                                title: "ابدأ التصنيع",
                                desc: "ادفع بأمان عبر المنصة، وتابع مراحل التنفيذ حتى تستلم أثاثك جاهزاً.",
                                bg: "bg-green-50", border: "border-green-100"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative group">
                                <div className={`h-full bg-white rounded-3xl p-8 border ${item.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-right`}>
                                    <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    <div className="absolute top-8 left-8 text-5xl font-black text-gray-50 uppercase tracking-tighter -z-10 group-hover:text-blue-50/50 transition-colors">
                                        0{item.id}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Proposition Split Section */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Clients */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Users className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 text-right">للعملاء الباحثين عن التميز</h3>
                            <ul className="space-y-5 text-right" dir="rtl">
                                {[
                                    "صمم أثاثك بمقاساتك الخاصة بدون تنازلات",
                                    "احصل على عروض أسعار من مصانع متعددة ووفر مالك",
                                    "ضمان جودة التصنيع والالتزام بالمواعيد",
                                    "تواصل مباشر مع المنفذ واطلاع على مراحل العمل"
                                ].map((point, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10 text-right">
                                <Link href="/requests/create" className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 justify-end group">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    اطلب أثاثك الآن
                                </Link>
                            </div>
                        </div>

                        {/* Providers */}
                        <div className="bg-gray-900 p-10 rounded-3xl shadow-xl border border-gray-800 hover:shadow-2xl transition-shadow text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-6">
                                    <Store className="w-7 h-7 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-extrabold mb-6 text-right">للمصانع والنجارين</h3>
                                <ul className="space-y-5 text-right" dir="rtl">
                                    {[
                                        "الوصول السريع لآلاف العملاء الجاهزين للطلب",
                                        "زيادة أرباحك وملء الفراغات التشغيلية بالمصنع",
                                        "نظام تقييم يبرز جودة عملك ويرفع الثقة",
                                        "إدارة سلسة للمدفوعات وضمان حقوقك المادية"
                                    ].map((point, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                            <span className="text-gray-300 font-medium">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 text-right">
                                    <Link href="/register?role=provider" className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-2 justify-end group">
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                        انضم كمزود خدمة
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-10">نضمن لك تجربة آمنة وموثوقة</h2>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        {[
                            { icon: <Shield className="w-10 h-10 text-blue-500 mb-3 mx-auto" />, text: "مدفوعات آمنة" },
                            { icon: <Clock className="w-10 h-10 text-blue-500 mb-3 mx-auto" />, text: "تسليم في الموعد" },
                            { icon: <Store className="w-10 h-10 text-blue-500 mb-3 mx-auto" />, text: "مزودون معتمدون" },
                            { icon: <Star className="w-10 h-10 text-blue-500 mb-3 mx-auto" />, text: "جودة مضمونة" },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="transition-transform duration-300 group-hover:-translate-y-2">
                                    {item.icon}
                                    <div className="font-semibold text-gray-600">{item.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    );
}

// Icon component
function SparklesIcon(props: any) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
    );
}
