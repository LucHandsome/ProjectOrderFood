import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentResult = () => {
    const { id } = useParams(); // Lấy orderId từ URL
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://order-app-88-037717b27b20.herokuapp.com/api/orders/${id}`);
                if (response.status === 200) {
                    setOrderDetails(response.data.data);
                } else {
                    console.error('Failed to fetch order details');
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [id]);

    return (
        <div className="flex flex-col min-h-screen p-6 bg-gray-100">
            <header className="bg-orange-600 text-white p-4 shadow-lg">
                <h1 className="text-3xl font-extrabold">Kết quả thanh toán</h1>
            </header>

            <main className="flex flex-1 p-6">
                <div className="w-full bg-white shadow-md rounded-lg p-4">
                    {orderDetails ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Thông tin đơn hàng</h2>
                            <p className="text-lg mb-2"><strong>Mã đơn hàng:</strong> {orderDetails._id}</p>
                            <p className="text-lg mb-2"><strong>Tổng tiền:</strong> {orderDetails.totalPrice} VNĐ</p>
                            <p className="text-lg mb-2"><strong>Trạng thái:</strong> {orderDetails.status}</p>
                            <p className="text-lg mb-2"><strong>Ngày đặt hàng:</strong> {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                            <p className="text-lg mb-2"><strong>Thông tin giao hàng:</strong> {orderDetails.deliveryInfo.address}</p>
                        </div>
                    ) : (
                        <p>Đang tải thông tin đơn hàng...</p>
                    )}
                </div>
            </main>

            <footer className="bg-orange-600 text-white p-4 mt-auto">
                <div className="text-center">
                    <p>© 2024 Ba Chàng Lính Ngự Lâm. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PaymentResult;
