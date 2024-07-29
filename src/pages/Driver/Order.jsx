import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = ({ driverId, onStatusUpdate }) => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://order-app-88-037717b27b20.herokuapp.com/api/order/orders', {
                    params: {
                        driverId: driverId,
                        status: 'Đã nhận đơn'
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

    const handleStatusUpdate = async (orderId) => {
        if (!newStatus) {
            console.error('Chưa chọn trạng thái mới');
            return;
        }

        let updateData = { status: newStatus };
        if (newStatus === 'Hoàn thành') {
            updateData.paymentStatus = 'Đã thanh toán';
        }

        try {
            const response = await axios.put(`https://order-app-88-037717b27b20.herokuapp.com/api/order/update-order/${orderId}`, updateData);
            if (response.data.status === 'OK') {
                if (newStatus === 'Hoàn thành') {
                    // Remove the order from the interface
                    setOrders(orders.filter(order => order._id !== orderId));
                    // Notify parent component to switch to the 'Lịch sử giao hàng' tab
                    onStatusUpdate();
                } else {
                    // For 'Đang giao', update the order status in the interface
                    setOrders(orders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    ));
                }
                setSelectedOrderId(null);
                setNewStatus('');
            } else {
                console.error('Cập nhật trạng thái không thành công');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        }
    };

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h2>
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
                            <div className="flex justify-end space-x-4 mt-2">
                                {selectedOrderId === order._id ? (
                                    <>
                                        <select
                                            value={newStatus}
                                            onChange={handleStatusChange}
                                            className="border rounded p-2"
                                        >
                                            <option value="">Chọn trạng thái</option>
                                            {order.status === 'Đã nhận đơn' && (
                                                <option value="Đang giao">Đang giao</option>
                                            )}
                                            {order.status === 'Đang giao' && (
                                                <option value="Hoàn thành">Hoàn thành</option>
                                            )}
                                        </select>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
                                            onClick={() => handleStatusUpdate(order._id)}
                                        >
                                            Cập nhật
                                        </button>
                                        <button
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                                            onClick={() => setSelectedOrderId(null)}
                                        >
                                            Hủy
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => setSelectedOrderId(order._id)}
                                    >
                                        Cập nhật trạng thái
                                    </button>
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

export default Order;
