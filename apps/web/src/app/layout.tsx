import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
    title: "أثاثي | منصة تصنيع الأثاث",
    description: "اطلب تصنيع أثاثك المخصص من أفضل المصانع والنجارين في السعودية",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className="antialiased" style={{ backgroundColor: '#f9fafb' }}>
                <AuthProvider>
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <footer className="bg-white border-t py-12">
                        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                            &copy; 2026 منصة أثاثي. جميع الحقوق محفوظة.
                        </div>
                    </footer>
                </AuthProvider>
            </body>
        </html>
    );
}
