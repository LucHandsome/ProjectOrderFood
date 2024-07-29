import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter, faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

const Menu = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (storeId) {
      const storedCart = localStorage.getItem(`cart-${storeId}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
        console.log("Cart loaded from localStorage:", JSON.parse(storedCart));
      }
    }
  }, [storeId]);
  
  useEffect(() => {
    if (storeId) {
      localStorage.setItem(`cart-${storeId}`, JSON.stringify(cart));
      console.log("Cart saved to localStorage:", JSON.stringify(cart));
    }
  }, [cart, storeId]);

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

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/store/get-store/${storeId}`);
        if (response.data.status === "OK") {
          setStore(response.data.data);
        } else {
          console.error("Failed to fetch store data");
        }
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    const fetchProductsData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/product/get-products-by-store/${storeId}`);
        if (response.data.status === "OK") {
          setProducts(response.data.data);
        } else {
          console.error("Failed to fetch products data");
        }
      } catch (error) {
        console.error("Error fetching products data:", error);
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
      <header className="sticky top-0 bg-orange-600 text-white p-4 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <button onClick={handleBackClick} className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md">
          Quay lại
        </button>
        <div className="flex flex-wrap items-center space-x-4 mt-4 md:mt-0">
          <button
            className="rounded-lg shadow-lg p-3 bg-orange-400 hover:bg-orange-500 hover:scale-125 relative"
            onClick={handleCartClick}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-white w-6 h-6" />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                {totalQuantity}
              </span>
            )}
          </button>
          <button className="rounded-lg shadow-lg p-3 bg-orange-400 hover:bg-orange-500 hover:scale-125">
            <FontAwesomeIcon icon={faUser} className="text-white w-6 h-6" />
          </button>
          <button className="rounded-lg shadow-lg p-3 bg-orange-400 hover:bg-orange-500 text-white hover:scale-125">
            VIE/ENG
          </button>
        </div>
      </header>

      <main className="flex-1 bg-gray-100 p-6">
        <div className="text-left mb-8 p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-4xl font-bold text-orange-500">{store.Store_name}</h1>
          <p className="text-lg text-gray-700 mt-2">Giờ mở cửa: {store.Store_timeOpen} - {store.Store_timeClose}</p>
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
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4 mt-8">Các món của cửa hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={product.Food_picture} className="w-full h-48 object-cover" alt={product.Food_name} />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">{product.Food_name}</h2>
                      <p className="text-gray-600 mt-2">{product.Food_detail}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-orange-600">{product.Price} VNĐ</span>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 hover:scale-105" onClick={() => handleSelectProduct(product)}>Chọn</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-600 mb-4 mt-8">Món thêm</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSek2rniJGbRaw-a1LkO80bfpZ6UbeooHjAkw&s' className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">Nem chua rán</h2>
                    <p className="text-gray-600 mt-2">Combo Vui Vẻ</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-orange-600">39.000 VNĐ</span>
                      <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 hover:scale-105">Thêm vào giỏ</button>
                    </div>
                  </div>
                </div>
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

      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.Food_name}</h2>
            <p className="text-gray-700 mb-4">{selectedProduct.Food_detail}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-orange-600">{selectedProduct.Price} VNĐ</span>
              <div className="flex items-center">
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-400"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-400"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                onClick={() => setSelectedProduct(null)}
              >
                Đóng
              </button>
              <button
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Giỏ hàng</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseCart}>
              Đóng
            </button>
          </div>
          <table className="w-full text-left mb-4">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-200 px-4 py-2">Tên sản phẩm</th>
                <th className="border-b-2 border-gray-200 px-4 py-2">Ảnh</th>
                <th className="border-b-2 border-gray-200 px-4 py-2">Số lượng</th>
                <th className="border-b-2 border-gray-200 px-4 py-2">Đơn giá</th>
                <th className="border-b-2 border-gray-200 px-4 py-2">Tổng tiền</th>
                <th className="border-b-2 border-gray-200 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td className="border-b border-gray-200 px-4 py-2">{item.Food_name}</td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    <img src={item.Food_picture} alt={item.Food_name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    <div className="flex items-center">
                      <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l hover:bg-gray-400"
                        onClick={() => handleDecreaseQuantity(item._id)}
                      >
                        -
                      </button>
                      <span className="px-4 py-2">{item.quantity}</span>
                      <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r hover:bg-gray-400"
                        onClick={() => handleIncreaseQuantity(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">{item.Price} VNĐ</td>
                  <td className="border-b border-gray-200 px-4 py-2">{item.quantity * item.Price} VNĐ</td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Tổng tiền:</h3>
            <span className="text-xl font-bold text-orange-600">{totalPrice} VNĐ</span>
          </div>
          <div className="flex justify-end">
            <button className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700" onClick={handleCheckout}>
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default Menu;
