import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

const CheckOut = () => {
    const location = useLocation();
    const cart = location.state.cart || [];
    const [customer, setCustomer] = useState({});
    const { storeId } = useParams();
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        phone: '',
        address: '',
        deliveryTime: '',
        deliveryDate: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerData = async () => {
            const customerId = localStorage.getItem('customerId');
            if (customerId) {
                try {
                    const response = await axios.get(`https://order-app-88-037717b27b20.herokuapp.com/api/customers/${customerId}`);
                    if (response.status === 200 && response.data.data) {
                        const customerData = response.data.data;
                        setCustomer(customerData);
                        setDeliveryInfo(prevInfo => ({
                            ...prevInfo,
                            name: customerData.customerName,
                            phone: customerData.phoneNumber, // Assuming phone number is part of the customer data
                        }));
                    } else {
                        console.error('Failed to fetch customer data:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            } else {
                console.error('Customer ID is null');
            }
        };

        fetchCustomerData();
    }, []);

    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.Price, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo({ ...deliveryInfo, [name]: value });
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleConfirmOrder = async () => {
        console.log('Delivery Info before sending:', deliveryInfo);  // Log thông tin giao hàng trước khi gửi
        const orderDetails = {
            customerId: customer._id,
            cart,
            deliveryInfo,
            totalPrice,
            storeId,
            paymentMethod
        };
    
        try {
            const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/order/create', orderDetails);
            if (response.data.status === 'OK') {
                const orderId = response.data.data._id;
                alert('Order placed successfully!');
                // localStorage.removeItem(cart-${storeId});
                navigate('/restaurantlist');
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-orange-600 text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
                <h1 className="text-3xl font-extrabold mb-4 md:mb-0">SHOPEE FOOD</h1>
                <div className="flex flex-wrap items-center space-x-4 mt-4 md:mt-0">
                    <button className='rounded-lg shadow-lg p-4 bg-orange-400 transform duration-300 hover:scale-125'>
                        VIE/ENG
                    </button>
                </div>
            </header>

            <main className="flex flex-1 p-6 bg-gray-100">
                <div className="flex flex-col md:flex-row w-full gap-6">
                    <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Đơn hàng của bạn</h2>
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item._id} className="flex items-center border-b border-gray-300 pb-4 mb-4">
                                    <div className="flex-1 flex items-center">
                                        <img src={item.Food_picture} alt={item.Food_name} className="w-16 h-16 object-cover mr-4" />
                                        <div className="flex flex-col flex-grow">
                                            <h3 className="text-lg font-semibold">{item.Food_name}</h3>
                                            <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                            <p className="text-gray-600">Đơn giá: {item.Price} VNĐ</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{item.quantity * item.Price} VNĐ</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Tổng tiền:</h3>
                            <span className="text-xl font-bold text-orange-600">{totalPrice} VNĐ</span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Thông tin giao hàng</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Họ và tên:</label>
                                <p className="text-lg">{customer.customerName}</p>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-700">Số điện thoại:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    value={deliveryInfo.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-gray-700">Địa chỉ:</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="border border-gray-300 p-2 rounded w-full"
                                    value={deliveryInfo.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Chọn phương thức thanh toán</label>
                                <select
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={paymentMethod}
                                    onChange={handlePaymentMethodChange}
                                >
                                    <option value="Tiền mặt">Tiền mặt</option>
                                    <option value="Online">Online</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
                                    onClick={handleConfirmOrder}
                                >
                                    Xác nhận đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-orange-600 text-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className="text-white w-6 h-6 transform duration-300 hover:scale-150" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="text-white w-6 h-6 transform duration-300 hover:scale-150" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="text-white w-6 h-6 transform duration-300 hover:scale-150" />
                        </a>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-extrabold">SHOPEE FOOD</h1>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faApple} className="text-white w-6 h-6 transform duration-300 hover:scale-150" />
                        </a>
                        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGooglePlay} className="text-white w-6 h-6 transform duration-300 hover:scale-150" />
                        </a>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>© 2024 Ba Chàng Lính Ngự Lâm. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default CheckOut;
