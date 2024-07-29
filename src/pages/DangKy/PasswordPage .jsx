import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const PasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = () => {
        navigate(-1); // Quay lại trang trước
    };

    const handleButtonClick = async () => {
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        try {
            const email = location.state.email;
            const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/user/sign-up', {
                email,
                password,
                confirmPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 'OK') {
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Error registering user:', err.response?.data || err.message);
            setError('An error occurred while registering the user');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleBackClick}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none focus:shadow-outline"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-bold ml-2">Đặt mật khẩu</h2>
                </div>
                <p className="text-gray-600 mb-4">Sử dụng mật khẩu này để đăng nhập vào tài khoản Shopee và Ứng dụng Shopee Partner</p>
                <div className="mb-4">
                    <label className="block text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <p className="text-gray-600 text-sm mb-4">Mật khẩu phải có độ dài từ 8-16 ký tự, bao gồm ít nhất một chữ in hoa, một chữ in thường và chỉ chứa chữ cái, số hoặc các ký tự thông dụng</p>
                <button onClick={handleButtonClick} className="w-full bg-blue-500 text-white py-2 rounded-lg">Xác nhận</button>
                <div className="mt-4 text-right">
                    <button className="text-blue-500">Trợ giúp</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordPage;
