import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryOrder = ({ driverId }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://order-app-88-037717b27b20.herokuapp.com/api/order/orders2', {
                    params: {
                        driverId: driverId,
                        status: 'Hoàn thành'
                    }
                });

                if (response.data.status === 'OK') {
                    setOrders(response.data.data);
                } else {
                    console.error('Lấy đơn hàng không thành công');
                }
            } catch (error) {
                console.error('Lỗi khi lấy đơn hàng:', error);
            }
        };

        if (driverId) {
            fetchOrders();
        }
    }, [driverId]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Lịch sử đơn hàng</h2>
            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <h3 className="text-xl font-semibold">{order._id}</h3>
                            <p><strong>Khách hàng:</strong> {order.deliveryInfo.name}</p>
                            <p><strong>Tổng tiền:</strong> {order.totalPrice} <span>đ</span></p>
                            <p><strong>Địa chỉ giao hàng:</strong> {order.deliveryInfo.address}</p>
                            <p><strong>Trạng thái:</strong> {order.status}</p>
                            <p><strong>Trạng thái thanh toán:</strong> {order.paymentStatus}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Bạn không có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};

export default HistoryOrder;
