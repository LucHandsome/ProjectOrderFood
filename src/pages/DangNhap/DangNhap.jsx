import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DangNhap = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleTiep=()=>{
        navigate('/register')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log('Email:', email);
        console.log('Password:', password);
    
        try {
            const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/user/sign-in', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });            
    
            console.log('Response Data:', response.data);
    
            if (response.data.status === 'OK') {
                const userId = response.data.userId; // Lấy ID người dùng từ phản hồi
                navigate("/registerstore", { state: { userId } });
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError('An error occurred');
        }
    };
    

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="md:flex-1 bg-orange-500 flex items-center justify-center p-4 md:p-0">
                <div className="text-white text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-white rounded-full p-2">
                            <img
                                src="https://th.bing.com/th/id/R.2962c4d86133dd9496e9e1ae5b77a855?rik=Mb7FgdfdjVhJog&pid=ImgRaw&r=0"
                                alt="Logo"
                                className="h-10 w-10"
                            />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold">Partner</h1>
                    <p className="mt-4 text-sm md:text-base">Nền tảng tích hợp quản lý bán hàng và thanh toán</p>
                </div>
            </div>
            <div className="md:flex-1 flex items-center justify-center p-4 md:p-0">
                <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-6 text-left">Đăng nhập</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                        <div className="flex items-center justify-between">
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className="mt-4">
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Đăng nhập với SMS
                            </a>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-700">
                                Bạn chưa có tài khoản?{' '}
                                <a onClick={handleTiep} className="font-bold text-blue-500 hover:text-blue-800" href="">
                                    Đăng ký ngay
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DangNhap;
