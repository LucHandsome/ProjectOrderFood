import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import HistoryStore from './HistoryStore';
import OrderStore from './OrderStore';

const OrderOfStore = () => {
    const { storeId } = useParams();
    const [activeTab, setActiveTab] = useState('order');
    const navigate = useNavigate();
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleBackClick = () => {
        navigate(-1); 
    };
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-orange-600 text-white p-4 shadow-lg">
                <h1 className="text-3xl font-extrabold">Dashboard</h1>
                <button
                    className="bg-white text-orange-600 font-bold py-2 px-4 rounded" // Add this button
                    onClick={handleBackClick}
                >
                    Trở lại trang trước
                </button>
            </header>

            <div className="flex flex-1">
                <aside className="w-1/4 bg-gray-200 p-4 hidden md:block">
                    <nav>
                        <ul className="space-y-4">
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
                    {activeTab === 'order' && <OrderStore storeId={storeId} />}
                    {activeTab === 'history' && <HistoryStore storeId={storeId} />}
                </main>
            </div>
        </div>
    );
};

export default OrderOfStore;
