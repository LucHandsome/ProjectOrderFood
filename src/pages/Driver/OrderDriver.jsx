import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderDriver = ({ driverId }) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchNewOrders = async () => {
            try {
                const response = await axios.get('https://order-app-88-037717b27b20.herokuapp.com/api/order/pending-orders');
                if (response.data.status === 'OK') {
                    setOrders(response.data.data);
                } else {
                    console.error('Failed to fetch new orders');
                }
            } catch (error) {
                console.error('Error fetching new orders:', error);
            }
        };

        fetchNewOrders();
    }, []);

    const handleConfirm = async (orderId) => {
        try {
            const response = await axios.put(`https://order-app-88-037717b27b20.herokuapp.com/api/order/update-order/${orderId}`, {
                status: 'Đã nhận đơn',
                driverId
            });
            if (response.data.status === 'OK') {
                setOrders(orders.filter(order => order._id !== orderId));
            } else {
                console.error('Failed to confirm order');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    const handleCancel = async (orderId) => {
        // Remove the order from the UI without making an API call
        setOrders(orders.filter(order => order._id !== orderId));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Đơn mới</h2>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h3 className="text-xl font-semibold">{order._id}</h3>
                        <p><strong>Khách hàng:</strong> {order.deliveryInfo.name}</p>
                        <p><strong>Tổng tiền:</strong> {order.totalPrice} <span>đ</span></p>
                        <p><strong>Địa chỉ giao hàng:</strong> {order.deliveryInfo.address}</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={() => handleConfirm(order._id)}
                            >
                                Xác nhận
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleCancel(order._id)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDriver;
