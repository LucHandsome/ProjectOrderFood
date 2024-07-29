import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InforStore = () => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeImageURL, setStoreImageURL] = useState('');
  const [storeType, setStoreType] = useState('');
  const [storeStatus, setStoreStatus] = useState('Open');
  const [storeTimeOpen, setStoreTimeOpen] = useState('');
  const [storeTimeClose, setStoreTimeClose] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // Lấy userId từ state


  const handleBackClick = () => {
    navigate(-1);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();

    if (!storeName || !storeAddress || !storeType || !storeImageURL) {
      toast.error('Vui lòng điền đầy đủ thông tin cửa hàng.', {
        position: 'top-center',
        autoClose: 3000
      });
      return;
    }

    const formData = {
      Store_name: storeName,
      Store_address: storeAddress,
      Store_picture: storeImageURL,
      Store_status: storeStatus,
      Store_LoaiKD: storeType,
      Store_timeOpen: storeTimeOpen,
      Store_timeClose: storeTimeClose,
      userId: userId // Thêm userId vào formData
    };

    try {
      const response = await axios.post('https://order-app-88-037717b27b20.herokuapp.com/api/store/sign-up-store', formData);

      if (response.data.status === 'OK') {
        toast.success('Tạo cửa hàng thành công!', {
          position: 'top-center',
          autoClose: 3000
        });
        // Chuyển hướng với userId
        navigate('/registerstore', { state: { userId } });
      } else {
        toast.error(`Lỗi: ${response.data.message}`, {
          position: 'top-center',
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error creating store:', error);
      toast.error('Đã xảy ra lỗi khi tạo cửa hàng. Vui lòng thử lại.', {
        position: 'top-center',
        autoClose: 3000
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16">
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center fixed w-full top-0 left-0">
        <h1 className="text-xl font-bold">Đăng Ký Quán</h1>
      </header>
      <main className="flex-grow flex justify-center mt-24">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Nhập thông tin cửa hàng của bạn</h2>
          <form onSubmit={handleButtonClick}>
            <div className="mb-4">
              <label htmlFor="storeName" className="block text-gray-700 font-bold mb-2">Tên cửa hàng</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="storeAddress" className="block text-gray-700 font-bold mb-2">Địa chỉ cửa hàng</label>
              <input
                type="text"
                id="storeAddress"
                name="storeAddress"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="storeImageURL" className="block text-gray-700 font-bold mb-2">URL ảnh cửa hàng</label>
              <input
                type="text"
                id="storeImageURL"
                name="storeImageURL"
                value={storeImageURL}
                onChange={(e) => setStoreImageURL(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Nhập URL ảnh"
                required
              />
              {storeImageURL && <img src={storeImageURL} alt="Store Preview" className="mt-4 w-full h-auto" />}
            </div>
            <h3 className="text-xl font-bold mb-4">Chọn loại hình kinh doanh</h3>
            <div className="mb-4 flex flex-col">
              <label htmlFor="food" className="flex items-center border border-gray-300 p-4 rounded-lg cursor-pointer hover:border-orange-500">
                <input
                  type="radio"
                  id="food"
                  name="business"
                  value="food"
                  checked={storeType === 'food'}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="form-radio text-orange-500 h-5 w-5 mr-4"
                  required
                />
                <img src="./src/img/food.jpg" alt="Food" className="w-12 h-12 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Đồ ăn</h3>
                  <p>Kinh doanh đồ ăn thức uống ăn liền như bún, mì, gà rán, pizza, trà sữa, cà phê, bánh kem, v.v.</p>
                </div>
              </label>
              <label htmlFor="supermarket" className="flex items-center border border-gray-300 p-4 rounded-lg cursor-pointer hover:border-orange-500 mt-4">
                <input
                  type="radio"
                  id="supermarket"
                  name="business"
                  value="supermarket"
                  checked={storeType === 'supermarket'}
                  onChange={(e) => setStoreType(e.target.value)}
                  className="form-radio text-orange-500 h-5 w-5 mr-4"
                  required
                />
                <img src="https://htmediagroup.vn/wp-content/uploads/2021/07/anh-my-pham-3-min.jpg" alt="Supermarket" className="w-12 h-12 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">Siêu thị</h3>
                  <p>Kinh doanh hàng tiêu dùng như mỹ phẩm, đồ gia dụng, đồ em bé, v.v.</p>
                </div>
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="storeTimeOpen" className="block text-gray-700 font-bold mb-2">Giờ mở cửa</label>
              <input
                type="text"
                id="storeTimeOpen"
                name="storeTimeOpen"
                value={storeTimeOpen}
                onChange={(e) => setStoreTimeOpen(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="storeTimeClose" className="block text-gray-700 font-bold mb-2">Giờ đóng cửa</label>
              <input
                type="text"
                id="storeTimeClose"
                name="storeTimeClose"
                value={storeTimeClose}
                onChange={(e) => setStoreTimeClose(e.target.value)}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={handleBackClick} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Quay lại</button>
              <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">Tiếp tục</button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </main>
    </div>
  );
};

export default InforStore;
