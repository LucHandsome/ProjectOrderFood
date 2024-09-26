import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPointerToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                setLoading(true);
                try {
                    const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/customers/sign-in-sso', { code });

                    if (response.status === 200) {
                        toast.success('Đăng nhập Pointer thành công!');
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('customerId', response.data.data.id);

                        // Điều hướng đến trang restaurantlist
                        navigate('/restaurantlist');
                    } else {
                        toast.error(response.data.message || 'Đăng nhập Pointer không thành công.');
                    }
                } catch (error) {
                    toast.error('Đã xảy ra lỗi khi đăng nhập với Pointer. Vui lòng thử lại.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchPointerToken();
    }, [navigate]);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Đang xử lý.....</h1>
    </div>
  );
};

export default AuthPage;
