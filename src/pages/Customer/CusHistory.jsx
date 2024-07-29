import React, { useState } from 'react';

const CusHistory = () => {
    const orders = [
        {
            id: 1,
            orderId: '202451732211',
            storeName: 'Vua Đậu',
            storeAddress: '828 Sư Vạn Hạnh, Phường 12, Q10, TP.HCM',
            deliveryAddress: '38 Văn Chung, Phường 12, Q.Tân Bình, TP.HCM',
            orderDetails: 'Bánh mì - 2 cái, Rau + Chả, Voucher 20.000 VNĐ, Giá 120.000 VNĐ',
            totalValue: '188.888 VNĐ',
            date: '2024-07-20'
        },
        {
            id: 2,
            orderId: '202451732212',
            storeName: 'Bánh Mì Huỳnh Hoa',
            storeAddress: '362 Nguyễn Trãi, Phường 8, Q5, TP.HCM',
            deliveryAddress: '647 CMT8, Phường Bến Thành, Q1, TP.HCM',
            orderDetails: 'Bánh mì - 3 cái, Thịt + Chả, Voucher 13.000 VNĐ, Giá 90.000 VNĐ',
            totalValue: '88.000 VNĐ',
            date: '2024-07-20'
        },
        {
            id: 3,
            orderId: '202451732213',
            storeName: 'Cơm chiên dương châu',
            storeAddress: '563 Lê Văn Khương, Phường Hiệp Thành, Q12, TP.HCM',
            deliveryAddress: '2 Lê Lợi, Phường Bến Thành, Q1, TP.HCM',
            orderDetails: 'Cơm, Thịt + Chả, Voucher 20.000 VNĐ, Giá 40.000 VNĐ',
            totalValue: '220.000 VNĐ',
            date: '2024-07-21'
        },
        {
            id: 4,
            orderId: '202451732214',
            storeName: 'Hủ tiếu gõ',
            storeAddress: '269 Lê Văn Thọ, Phường 15, Q.Gò Vấp, TP.HCM',
            deliveryAddress: '1238 Trường Sơn, Phường 11, Q.Tân Bình, TP.HCM',
            orderDetails: 'Bánh mì - 3 cái, Thịt + Chả, Voucher 10.000 VNĐ, Giá 90.000 VNĐ',
            totalValue: '120.000 VNĐ',
            date: '2024-07-21'
        }
    ];

    const uniqueDates = [...new Set(orders.map(order => order.date))];
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const filteredOrders = selectedDate ? orders.filter(order => order.date === selectedDate) : orders;

    const totalOrdersForSelectedDate = filteredOrders.length;
    const totalOrderValueForSelectedDate = filteredOrders.reduce((total, order) => {
        const value = parseFloat(order.totalValue.replace(/[^0-9.-]+/g, ""));
        return total + value;
    }, 0);

    return (
        <div className='container mx-auto'>
            <div className='flex justify-center items-center text-5xl font-bold p-5'>
                Lịch sử đơn hàng
            </div>
            <div className='flex space-x-2'>
                <div className='text-2xl font-semibold'>Ngày:</div>
                <select className='mb-4 text-2xl' onChange={handleDateChange}>
                    <option value="">Chọn ngày</option>
                    {uniqueDates.map((date, index) => (
                        <option key={index} value={date}>{date}</option>
                    ))}
                </select>
            </div>
            <div className='flex space-x-2 items-center pb-5 pt-5'>
                <div className='text-2xl font-semibold'>Tổng số đơn giao:</div>
                <div className='text-2xl'>{totalOrdersForSelectedDate}</div>
            </div>
            <div className='flex space-x-2 items-center pb-5'>
                <div className='text-2xl font-semibold'>Tổng giá trị đơn giao:</div>
                <div className='text-2xl'>{totalOrderValueForSelectedDate.toLocaleString('vi-VN')}</div>
            </div>
            <table className='table-auto w-full border-collapse border border-black rounded-md'>
                <thead>
                    <tr className='bg-black'>
                        <th className='border border-white px-4 py-2 text-white'>STT</th>
                        <th className='border border-white px-4 py-2 text-white'>Mã HD</th>
                        <th className='border border-white px-4 py-2 text-white'>Tên cửa hàng</th>
                        <th className='border border-white px-4 py-2 text-white'>Địa chỉ cửa hàng</th>
                        <th className='border border-white px-4 py-2 text-white'>Địa chỉ giao hàng</th>
                        <th className='border border-white px-4 py-2 text-white'>Chi tiết đơn hàng</th>
                        <th className='border border-white px-4 py-2 text-white'>Tổng giá trị đơn hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-400'}>
                            <td className='border border-gray-900 px-4 py-2 text-center'>{index + 1}</td>
                            <td className='border border-gray-900 px-4 py-2 text-center'>{order.orderId}</td>
                            <td className='border border-gray-900 px-4 py-2 text-center'>{order.storeName}</td>
                            <td className='border border-gray-900 px-4 py-2 text-center'>{order.storeAddress}</td>
                            <td className='border border-gray-900 px-4 py-2 text-center'>{order.deliveryAddress}</td>
                            <td className='border border-gray-900 px-4 py-2 text-center'>{order.orderDetails}</td>
                            <td className='border border-gray-900 px-4 py-2 text-center'>{order.totalValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>
    );
};

export default CusHistory;
