import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Hàm xử lý đăng nhập qua email và password
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/customers/sign-in', { email, password });

            if (response.data.token) {
                toast.success('Đăng nhập thành công!');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('customerId', response.data.data.id);
                navigate('/restaurantlist');
            } else {
                toast.error(response.data.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.');
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

        // Hàm xử lý đăng nhập qua SSO
        const handlePointerLogin = () => {
            const clientId = '66f57407339e1fafaaba3f61';
            const redirectUri = encodeURIComponent('https://project-order-food.vercel.app/authPage');
            const authUrl = `https://sso-pointer.vercel.app/authorize?clientId=${clientId}&redirect_uri=${redirectUri}`;
            console.log('URL xác thực:', authUrl);
            window.location.href = authUrl;
        };
        
        // useEffect(() => {
        //     const fetchPointerToken = async () => {
        //         const urlParams = new URLSearchParams(window.location.search);
        //         const code = urlParams.get('code');
        
        //         if (code) {
        //             setLoading(true);
        //             try {
        //                 const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/customers/sign-in-sso', { code });
        
        //                 if (response.status === 200) {
        //                     console.log("Response from API:", response.data);
        //                     toast.success('Đăng nhập Pointer thành công!');
        //                     localStorage.setItem('token', response.data.token);
        //                     localStorage.setItem('customerId', response.data.data.id);
        //                     navigate('/restaurantlist');
        //                 } else {
        //                     toast.error(response.data.message || 'Đăng nhập Pointer không thành công.');
        //                 }
        //             } catch (error) {
        //                 console.error('Error response:', error.response?.data || error.message);
        //                 toast.error('Đã xảy ra lỗi khi đăng nhập với Pointer. Vui lòng thử lại.');
        //             } finally {
        //                 setLoading(false);
        //             }
        //         } else {
        //             toast.error('Mã code không được cung cấp.');
        //         }
        //     };
        
        //     fetchPointerToken();
        // }, [navigate]); // `useEffect` will trigger only after redirect to the page
        
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
                    <h1 className="text-4xl md:text-5xl font-bold">Customer</h1>
                    <p className="mt-4 text-sm md:text-base">Nền tảng đặt đồ ăn online tiện lợi, giá rẻ</p>
                </div>
            </div>
            <div className="md:flex-1 flex items-center justify-center p-4 md:p-0 bg-gray-100">
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nhập email của bạn"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Nhập mật khẩu của bạn"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                        </button>
                        <div className="mt-4 text-center">
                            <p className="text-gray-700">
                                Bạn chưa có tài khoản?{' '}
                                <a onClick={() => navigate('/sign-up-page')} className="font-bold text-blue-500 hover:text-blue-700">
                                    Đăng ký ngay
                                </a>
                            </p>
                        </div>
                    </form>
                    <div className="mt-4">
                        <button
                            onClick={handlePointerLogin}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập bằng Pointer'}
                        </button>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
