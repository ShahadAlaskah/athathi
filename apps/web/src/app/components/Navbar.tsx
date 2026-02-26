'use client';

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { t, language, toggleLanguage } = useLanguage();

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
                    <Link href="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>

                    {/* Only show 'Order Now' for Clients or Guest */}
                    {(!user || user.role === 'CLIENT') && (
                        <Link
                            href="/requests/create"
                            onClick={(e) => handleProtectedLink(e, '/requests/create')}
                            className="hover:text-primary transition-colors"
                        >
                            {t('nav.new_request')}
                        </Link>
                    )}

                    {/* Only show 'Browse Requests' for Providers */}
                    {user?.role === 'PROVIDER' && (
                        <Link
                            href="/requests"
                            className="hover:text-primary transition-colors"
                        >
                            {t('nav.browse_requests')}
                        </Link>
                    )}

                    {/* Only show User/Provider Dashboard if not Admin */}
                    {user?.role !== 'ADMIN' && (
                        <Link
                            href="/dashboard"
                            onClick={(e) => handleProtectedLink(e, '/dashboard')}
                            className="hover:text-primary transition-colors"
                        >
                            {t('nav.my_dashboard')}
                        </Link>
                    )}

                    {/* Only show Admin Dashboard for ADMIN */}
                    {user?.role === 'ADMIN' && (
                        <Link
                            href="/admin"
                            className="text-red-600 font-bold hover:text-red-700 transition-colors"
                        >
                            {t('nav.admin_dashboard')}
                        </Link>
                    )}
                </div>

                <div className="flex gap-2 items-center">
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 mr-4 border border-gray-200 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors uppercase"
                        dir="ltr"
                    >
                        {language === 'ar' ? 'EN' : 'عربي'}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                {t('dash.welcome').split('{name}')[0]}
                                <span className="font-bold">{user.fullName}</span>
                                {t('dash.welcome').split('{name}')[1]}
                            </span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-btn transition-all"
                            >
                                {t('dash.logout')}
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">{t('nav.login')}</Link>
                            <Link href="/register" className="btn-primary text-sm px-6">{t('nav.register_factory')}</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
