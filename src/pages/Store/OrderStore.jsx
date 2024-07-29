import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderStore = ({ storeId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/order/orderstore2', {
                    params: {
                        storeId: storeId,
                        status: 'Đã nhận đơn'
                    }
                });

                if (response.data.status === 'OK') {
                    setOrders(Array.isArray(response.data.data) ? response.data.data : []);
                } else {
                    console.error('Lấy đơn hàng không thành công');
                    setOrders([]);
                }
            } catch (error) {
                console.error('Lỗi khi lấy đơn hàng:', error);
                setError('Đã xảy ra lỗi khi lấy đơn hàng. Vui lòng thử lại.');
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        if (storeId) {
            fetchOrders();
        }
    }, [storeId]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <h3 className="text-xl font-semibold">Đơn hàng ID: {order._id}</h3>
                            <p><strong>Khách hàng:</strong> {order.deliveryInfo.name}</p>
                            <p><strong>Tổng tiền:</strong> {order.totalPrice} <span>đ</span></p>
                            <p><strong>Địa chỉ giao hàng:</strong> {order.deliveryInfo.address}</p>
                            <p><strong>Trạng thái:</strong> {order.status}</p>
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-2">Danh sách món ăn</h4>
                                {order.cart.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {order.cart.map((item, index) => (
                                            <li key={index} className="mb-4">
                                            <div className="flex items-center">
                                                {item.Food_picture && (
                                                    <img
                                                        src={item.Food_picture}
                                                        alt={item.Food_name}
                                                        className="w-24 h-24 object-cover mr-4 rounded"
                                                    />
                                                )}
                                                <div>
                                                    <p><strong>Tên món:</strong> {item.Food_name}</p>
                                                    <p><strong>Số lượng:</strong> {item.quantity}</p>
                                                    <p><strong>Giá:</strong> {item.Price} <span>đ</span></p>
                                                </div>
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">Không có món ăn trong đơn hàng.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Bạn không có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};

export default OrderStore;
