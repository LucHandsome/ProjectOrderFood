import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Menu = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load and save cart to localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem(`cart-${storeId}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [storeId]);

  useEffect(() => {
    if (storeId) {
      localStorage.setItem(`cart-${storeId}`, JSON.stringify(cart));
    }
  }, [cart, storeId]);

  // Functions to handle cart operations
  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  // Fetch store and products data
  useEffect(() => {
    const fetchStoreData = async () => {
      const response = await axios.get(`https://order-app-88-037717b27b20.herokuapp.com/api/store/get-store/${storeId}`);
      if (response.data.status === "OK") {
        setStore(response.data.data);
      }
    };

    const fetchProductsData = async () => {
      const response = await axios.get(`https://order-app-88-037717b27b20.herokuapp.com/api/product/get-products-by-store/${storeId}`);
      if (response.data.status === "OK") {
        setProducts(response.data.data);
      }
    };

    if (storeId) {
      fetchStoreData();
      fetchProductsData();
    }
  }, [storeId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item._id === selectedProduct._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === selectedProduct._id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...selectedProduct, quantity }]);
    }
    setSelectedProduct(null);
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.Price, 0);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    navigate(`/checkout/${storeId}`, { state: { cart } });
  };

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 bg-orange-600 text-white p-4 flex justify-between items-center shadow-lg">
        <button onClick={handleBackClick} className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md">
          Quay lại
        </button>
        <nav className="flex space-x-4">
          <button onClick={handleCartClick} className="relative bg-orange-400 hover:bg-orange-500 p-3 rounded-lg transition duration-300">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {totalQuantity}
              </span>
            )}
          </button>
          <button className="bg-orange-400 hover:bg-orange-500 p-3 rounded-lg transition duration-300">
            <FontAwesomeIcon icon={faUser} className="text-white w-6 h-6" />
          </button>
          <button className="bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-lg transition duration-300">
            VIE/ENG
          </button>
        </nav>
      </header>

      <main className="flex-1 bg-gray-100 p-6">
        <div className="text-left mb-8 p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-4xl font-bold text-orange-500">{store.Store_name}</h1>
          <p className="text-lg text-gray-700 mt-2">Giờ mở cửa: {store.Store_timeOpen} - {store.Store_timeClose}</p>
          {/* Delivery time and date selection */}
          <div className="flex items-center mt-4 space-x-6">
            <div className="flex flex-col">
              <label htmlFor="delivery-time" className="text-gray-700 mb-2">Chọn giờ giao:</label>
              <select className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="delivery-date" className="text-gray-700 mb-2">Chọn ngày giao:</label>
              <input type="date" className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>
          {/* Store information */}
          <div className="flex items-center mt-6 space-x-6 text-gray-700">
            <div className="flex items-center p-2">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
              2.5
            </div>
            <div className="flex items-center p-2">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              65 phút
            </div>
            <div className="flex items-center p-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
              10 km
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 border-t-2 border-b-2 border-gray-300 pt-6">
          <aside className="w-full md:w-64 bg-orange-700 text-white flex-shrink-0 p-4 border-r border-gray-300 rounded-lg">
            <nav className="sticky top-28 bg-orange-700 p-4 border-l-4 border-orange-800 shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Danh Mục</h2>
              <ul className="space-y-4">
                <li>
                  <a href="#combo" className="block text-lg hover:text-orange-400 transition-colors duration-200">Combo</a>
                </li>
                <li>
                  <a href="#mon-them" className="block text-lg hover:text-orange-400 transition-colors duration-200">Món thêm</a>
                </li>
              </ul>
            </nav>
          </aside>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Sản Phẩm</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={product.Image || 'default-image-url.jpg'} alt={product.Product_name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">{product.Product_name}</h3>
                    <p className="text-lg text-orange-500">{product.Price} VNĐ</p>
                    <button onClick={() => handleSelectProduct(product)} className="bg-orange-600 text-white mt-2 px-4 py-2 rounded-lg transition duration-300 hover:bg-orange-500">
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{selectedProduct.Product_name}</h2>
              <p className="text-lg mb-4">{selectedProduct.Price} VNĐ</p>
              <div className="flex items-center mb-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-200 px-4 py-2 rounded-l-lg">-</button>
                <input type="number" value={quantity} readOnly className="border text-center w-12" />
                <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 px-4 py-2 rounded-r-lg">+</button>
              </div>
              <button onClick={handleAddToCart} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Thêm vào giỏ hàng</button>
              <button onClick={() => setSelectedProduct(null)} className="ml-4 text-gray-500 underline">Đóng</button>
            </div>
          </div>
        )}

        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
              {cart.length === 0 ? (
                <p className="text-lg">Giỏ hàng của bạn trống.</p>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center mb-4">
                      <span>{item.Product_name} x {item.quantity}</span>
                      <div className="flex items-center">
                        <button onClick={() => handleDecreaseQuantity(item._id)} className="bg-gray-200 px-2 py-1 rounded-l-lg">-</button>
                        <span className="border text-center w-12">{item.quantity}</span>
                        <button onClick={() => handleIncreaseQuantity(item._id)} className="bg-gray-200 px-2 py-1 rounded-r-lg">+</button>
                        <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-600 ml-4">Xóa</button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold">
                    <span>Tổng:</span>
                    <span>{totalPrice} VNĐ</span>
                  </div>
                  <button onClick={handleCheckout} className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg">Thanh toán</button>
                </div>
              )}
              <button onClick={handleCloseCart} className="mt-4 text-gray-500 underline">Đóng</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Menu;
