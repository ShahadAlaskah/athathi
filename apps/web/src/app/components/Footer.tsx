'use client';

import Link from 'next/link';
import { Sofa, MapPin, Phone, Mail, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <Sofa className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black text-gray-900 tracking-tight">أثاثي</span>
                        </Link>
                        <p className="text-gray-500 leading-relaxed text-sm">
                            المنصة الأولى الموثوقة في المملكة العربية السعودية التي تربطك بأمهر النجارين وأفضل المصانع لتحويل أفكارك إلى قطع أثاث فريدة، بأعلى جودة وأفضل سعر.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">روابط سريعة</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">الرئيسية</Link></li>
                            <li><Link href="/requests/create" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">انشئ طلب تفصيل</Link></li>
                            <li><Link href="/requests" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">تصفح الطلبات المفتوحة</Link></li>
                            <li><Link href="/register?role=provider" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">سجل كمصنع / نجار</Link></li>
                            <li><Link href="/about" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">من نحن</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">الدعم والمساعدة</h4>
                        <ul className="space-y-4">
                            <li><Link href="/faq" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">الأسئلة الشائعة</Link></li>
                            <li><Link href="/terms" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">الشروط والأحكام</Link></li>
                            <li><Link href="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">سياسة الخصوصية</Link></li>
                            <li><Link href="/refund" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">سياسة الاسترجاع والضمان</Link></li>
                            <li><Link href="/contact" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">تواصل معنا</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">تواصل معنا</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 text-gray-500">
                                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <span className="text-sm leading-relaxed">المملكة العربية السعودية<br />الرياض، طريق الملك فهد</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-500">
                                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <span className="text-sm" dir="ltr">+966 50 123 4567</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-500">
                                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <span className="text-sm font-sans tracking-wide">support@athathi.sa</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} منصة أثاثي. جميع الحقوق محفوظة.
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                        <span className="text-gray-400">صنع بثقة في السعودية 🇸🇦</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
