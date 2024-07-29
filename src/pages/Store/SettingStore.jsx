import React, { useState } from 'react';
import { useNavigate,useParams,useLocation  } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingStore = () => {
    const [storeTimeOpen, setStoreTimeOpen] = useState('');
    const [storeTimeClose, setStoreTimeClose] = useState('');
    const [storeStatus, setStoreStatus] = useState('open');
    const { storeId } = useParams();
    const location = useLocation();
    const { userId } = location.state || {}; // Lấy userId từ state
    const navigate = useNavigate();


    const handleUpdateClick = async () => {
        try {
            const formData = {
                Store_timeOpen: storeTimeOpen,
                Store_timeClose: storeTimeClose,
                Store_status: storeStatus
            };

            const response = await axios.put(`https://order-app-88-037717b27b20.herokuapp.com/api/store/update-store/${storeId}`, formData);

            if (response.data.status === 'OK') {
                toast.success('Cập nhật cửa hàng thành công!', {
                    position: 'top-center',
                    autoClose: 3000
                  });
                  // Chuyển hướng với userId
                  navigate(`/homestore/${storeId}`);
            } else {
                toast.error(`Lỗi: ${response.data.message}`, {
                    position: 'top-center',
                    autoClose: 3000
                });
            }
        } catch (error) {
            console.error('Error updating store:', error);
            toast.error('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.', {
                position: 'top-center',
                autoClose: 3000
            });
        }
    };

    return (
        <div className="bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-300 min-h-screen flex flex-col">
            <header className="bg-orange-600 text-white p-6 shadow-lg flex justify-center items-center">
                <h1 className="text-3xl font-extrabold">Thông tin cửa hàng</h1>
            </header>

            <main className="flex-grow p-6">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-black text-xl font-bold mb-4">Thời gian đóng/mở cửa</h2>
                    <div className="space-y-4">
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-300">
                            <span className="text-black font-semibold mr-4">Mở</span>
                            <input
                                type="time"
                                value={storeTimeOpen}
                                onChange={(e) => setStoreTimeOpen(e.target.value)}
                                className="flex-1 bg-white text-black font-semibold p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-300">
                            <span className="text-black font-semibold mr-4">Đóng</span>
                            <input
                                type="time"
                                value={storeTimeClose}
                                onChange={(e) => setStoreTimeClose(e.target.value)}
                                className="flex-1 bg-white text-black font-semibold p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <h2 className="text-black text-xl font-bold mt-10 mb-4">Trạng thái cửa hàng</h2>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-300">
                        <select
                            value={storeStatus}
                            onChange={(e) => setStoreStatus(e.target.value)}
                            className="bg-white text-black font-semibold p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="open">Mở cửa</option>
                            <option value="closed">Đóng cửa</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={handleUpdateClick}
                        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Lưu
                    </button>
                    <button
                        className="mt-4 w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md transform"
                        onClick={() => navigate(-1)}
                    >
                        Quay lại
                    </button>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
};

export default SettingStore;
