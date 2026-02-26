'use client';

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleProtectedLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!user) {
            e.preventDefault();
            router.push('/login');
        }
    };

    return (
        <nav className="border-b bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary">أثاثي</Link>

                <div className="flex gap-6 text-sm font-medium text-gray-600">
                    <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>

                    {/* Only show 'Order Now' for Clients or Guest */}
                    {(!user || user.role === 'CLIENT') && (
                        <Link
                            href="/requests/create"
                            onClick={(e) => handleProtectedLink(e, '/requests/create')}
                            className="hover:text-primary transition-colors"
                        >
                            اطلب الآن
                        </Link>
                    )}

                    {/* Only show 'Browse Requests' for Providers */}
                    {user?.role === 'PROVIDER' && (
                        <Link
                            href="/requests"
                            className="hover:text-primary transition-colors"
                        >
                            تصفح الطلبات
                        </Link>
                    )}

                    <Link
                        href="/dashboard"
                        onClick={(e) => handleProtectedLink(e, '/dashboard')}
                        className="hover:text-primary transition-colors"
                    >
                        لوحة التحكم
                    </Link>
                </div>

                <div className="flex gap-2">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">مرحباً، <span className="font-bold">{user.fullName}</span></span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-btn transition-all"
                            >
                                تسجيل الخروج
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">تسجيل الدخول</Link>
                            <Link href="/register" className="btn-primary text-sm px-6">ابدأ مجاناً</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
