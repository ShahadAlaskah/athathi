import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
                <LanguageProvider>
                    <AuthProvider>
                        <Navbar />
                        <main className="min-h-screen">
                            {children}
                        </main>
                        <Footer />
                    </AuthProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
