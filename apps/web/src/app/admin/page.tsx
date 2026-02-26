'use client';

import { Users, ShoppingBag, DollarSign, Activity, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-extrabold text-gray-900">نظرة عامة</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">إجمالي المستخدمين</p>
                        <h3 className="text-3xl font-bold text-gray-900">4,281</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">إجمالي الطلبات</p>
                        <h3 className="text-3xl font-bold text-gray-900">1,245</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-purple-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">حجم المبيعات (ريال)</p>
                        <h3 className="text-3xl font-bold text-gray-900">850K+</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">المصانع النشطة</p>
                        <h3 className="text-3xl font-bold text-gray-900">312</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                        <Activity className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center">
                <TrendingUp className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">مساحة مخصصة للرسوم البيانية للمبيعات بانتظار الربط بالـ API</p>
            </div>
        </div>
    );
}
