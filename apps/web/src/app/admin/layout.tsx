'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, ShoppingBag, Megaphone, LifeBuoy, LogOut, Sofa } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Enforce admin only
        if (user && user.role !== 'ADMIN') {
            router.push('/');
        }
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!user || user.role !== 'ADMIN') {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
    }

    const navigation = [
        { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
        { name: 'إدارة المستخدمين', href: '/admin/users', icon: Users },
        { name: 'إدارة الطلبات', href: '/admin/requests', icon: ShoppingBag },
        { name: 'إدارة الإعلانات', href: '/admin/ads', icon: Megaphone },
        { name: 'الدعم الفني', href: '/admin/support', icon: LifeBuoy },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex" dir="rtl">
            {/* Sidebar */}
            <div className="w-64 bg-white border-l border-gray-100 flex flex-col fixed inset-y-0 right-0 z-50">
                <div className="p-6">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Sofa className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">أثاثي</span>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-md ml-auto">Admin</span>
                    </Link>
                </div>

                <div className="flex-1 px-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 font-medium cursor-pointer hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                        تسجيل الخروج
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 mr-64">
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
