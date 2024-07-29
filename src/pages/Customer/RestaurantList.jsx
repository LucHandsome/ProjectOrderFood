import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeNameQuery, setStoreNameQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      const customerId = localStorage.getItem('customerId');
      console.log("ID là", customerId);

      if (customerId) {
        try {
          const response = await axios.get(`http://localhost:3001/api/customers/${customerId}`);
          console.log("Response từ API là:", response);

          if (response.status === 200 && response.data.data) {
            setCustomer(response.data.data);
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

    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/store/stores');
        if (response.data.status === 'OK') {
          setStores(response.data.data);
          setFilteredStores(response.data.data);
        } else {
          console.error('Failed to fetch stores');
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };


    fetchCustomerData();
    fetchStores();

    // Load cart from local storage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleStoreClick = (storeId) => {
    navigate(`/menu/${storeId}`);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredStores(stores.filter(store => store.Store_address.toLowerCase().includes(query)));
  };

  const handleStoreNameSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setStoreNameQuery(query);
    setFilteredStores(stores.filter(store => store.Store_name.toLowerCase().includes(query)));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-orange-600 text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <h1 className="text-3xl font-extrabold mb-4 md:mb-0">SHOPEE FOOD</h1>
        <form className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Nhập địa chỉ"
            className="text-black p-3 border border-gray-300 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm món"
              className="text-black p-3 border border-gray-300 rounded-l-md flex-grow focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={storeNameQuery}
              onChange={handleStoreNameSearchChange}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-3 rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Tìm
            </button>
          </div>
        </form>
        <div className="flex flex-wrap items-center space-x-4 mt-4 md:mt-0">
          <button className="rounded-lg shadow-lg p-3 bg-orange-400 hover:bg-orange-500 hover:scale-125 relative" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} className="text-white w-6 h-6" />
          </button>
          <button className="rounded-lg shadow-lg p-3 bg-orange-400 hover:bg-orange-500 hover:scale-125">
            <FontAwesomeIcon icon={faUser} className="text-white w-6 h-6" />
          </button>
          <button className="rounded-lg shadow-lg p-4 bg-orange-400 transform duration-300 hover:scale-125">
            VIE/ENG
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Cửa hàng gần tôi</h2>
          <p className="text-lg">Xin chào, {customer.customerName}!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStores.map((store, index) => (
            <div key={index} onClick={() => handleStoreClick(store._id)} className="bg-white rounded-lg shadow-md overflow-hidden transform duration-300 hover:scale-105 cursor-pointer">
              <img
                src={store.Store_picture}
                className="w-full h-40 object-cover"
                alt={store.Store_name}
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold">{store.Store_name}</h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" /> 2.5
                  </span>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faClock} className="mr-1" /> 65 phút
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> 10 km
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-orange-600 text-white p-6 mt-6">
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

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
            {cart.length === 0 ? (
              <p className="text-center">Giỏ hàng trống</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-4"
              onClick={handleCartClick}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
