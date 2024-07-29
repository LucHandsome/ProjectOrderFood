import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderDriver from './OrderDriver'; // Điều chỉnh đường dẫn nhập nếu cần
import Order from './Order';
import HistoryOrder from './History';

const HomeDriver = () => {
    const [activeTab, setActiveTab] = useState('newOrders');
    const location = useLocation();
    const driverId = location.state?.driverId; // Lấy driverId từ state của location

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Cập nhật trạng thái và chuyển tab nếu cần
    const handleStatusUpdate = (newStatus) => {
        if (newStatus === 'Hoàn thành') {
            setActiveTab('history');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-orange-600 text-white p-4 shadow-lg">
                <h1 className="text-3xl font-extrabold">Dashboard</h1>
            </header>

            <div className="flex flex-1">
                <aside className="w-1/4 bg-gray-200 p-4 hidden md:block">
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    className={`w-full p-2 text-left ${activeTab === 'newOrders' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'}`}
                                    onClick={() => handleTabClick('newOrders')}
                                >
                                    Đơn mới
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`w-full p-2 text-left ${activeTab === 'order' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'}`}
                                    onClick={() => handleTabClick('order')}
                                >
                                    Đơn hàng
                                </button>
                            </li>
                            <li>
                                <button
                                    className={`w-full p-2 text-left ${activeTab === 'history' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'}`}
                                    onClick={() => handleTabClick('history')}
                                >
                                    Lịch sử giao hàng
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-4">
                    {activeTab === 'newOrders' && <OrderDriver driverId={driverId} />}
                    {activeTab === 'order' && <Order driverId={driverId} onStatusUpdate={handleStatusUpdate} />}
                    {activeTab === 'history' && <HistoryOrder driverId={driverId} />}
                </main>
            </div>
        </div>
    );
};

export default HomeDriver;
