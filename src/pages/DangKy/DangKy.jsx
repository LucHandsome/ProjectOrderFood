import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

const DangKy = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Quay lại trang trước
    };
    const handleLogin = () => {
        navigate('/login'); // Quay lại trang trước
    };

    const handleButtonClick = async () => {
        try {
            const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/user/check-email', { email });
            if (response.data.status === 'OK') {
                navigate('/registerpassword', { state: { email } });
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Error checking email:', err.response?.data || err.message);
            setError('An error occurred while checking the email');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="md:flex-1 bg-orange-500 flex items-center justify-center p-4 md:p-0">
                <div className="text-white text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white rounded-full p-2">
                            <img src="https://th.bing.com/th/id/R.2962c4d86133dd9496e9e1ae5b77a855?rik=Mb7FgdfdjVhJog&pid=ImgRaw&r=0" alt="Logo" className="h-10 w-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold">Partner</h1>
                    <p className="mt-4 text-sm md:text-base">Nền tảng tích hợp quản lý bán hàng và thanh toán</p>
                </div>
            </div>
            <div className="md:flex-1 flex items-center justify-center p-4 md:p-0">
                <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center mb-6">
                        <button onClick={handleBackClick} className="text-gray-700 hover:text-gray-900 focus:outline-none focus:shadow-outline">
                            <FaArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold ml-2">Đăng ký</h2>
                    </div>
                    <form>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="SĐT / Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                        <div className="mb-6"></div>
                        <div className="flex items-center justify-between">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleButtonClick}
                            >
                                Tiếp
                            </button>
                        </div>
                        <div className="mt-4"></div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-700">
                                Bạn đã có tài khoản?{' '}
                                <a onClick={handleLogin} className="font-bold text-blue-500 hover:text-blue-800" href="/login">Đăng nhập</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DangKy;
