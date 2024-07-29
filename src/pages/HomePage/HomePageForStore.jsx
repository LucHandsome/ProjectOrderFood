import React from "react";
import { useNavigate } from 'react-router-dom';

const HomePageForStore = () => {
    const navigate = useNavigate();

    const handleLoginDriver = () => {
        navigate('/loginDriver');
    };
    const handleLoginCustomer = () => {
        navigate('/loginpage');
    };
    const handleLoginStore = () => {
        navigate('/login');
    };
    const handleLoginAdmin = () => {
        navigate('/adminpage');
    };

    return (
        <div className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-extrabold mb-10">Đăng nhập vào ứng dụng đặt đồ ăn</h1>
            <div className="space-y-4 w-full max-w-md px-4">
                <button
                    onClick={handleLoginDriver}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                >
                    Đăng nhập cho tài xế
                </button>
                <button
                    onClick={handleLoginStore}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                >
                    Đăng nhập cho cửa hàng
                </button>
                <button
                    onClick={handleLoginCustomer}
                    className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 shadow-md"
                >
                    Đăng nhập cho khách hàng
                </button>
                <button
                    onClick={handleLoginAdmin}
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
                >
                    Đăng nhập cho admin
                </button>
            </div>
        </div>
    );
}

export default HomePageForStore;
