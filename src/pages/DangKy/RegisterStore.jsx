import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const RegisterStore = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {}; // Lấy userId từ state

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Lấy danh sách cửa hàng của userId từ query params
        const response = await axios.get(`http://localhost:3001/api/store/getall-stores/${userId}`, {
          params: { userId }
        });
        setStores(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stores by user:', error);
        setError('Không thể tải danh sách cửa hàng');
        setLoading(false);
      }
    };

    if (userId) {
      fetchStores();
    }
  }, [userId]);

  const handleStoreClick = (storeId) => {
    navigate(`/homestore/${storeId}`);
  };

  const handleButtonClick = () => {
    navigate(`/inforstore`, { state: { userId } });
  };

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
        <button onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Tạo quán mới
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center fixed w-full top-0 left-0">
        <h1 className="text-xl font-bold">Danh Sách Cửa Hàng</h1>
        <div className="flex space-x-4 items-center">
          <button onClick={handleButtonClick} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Tạo quán mới
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center mt-20">
        <div className='w-full'>
          <div className="text-left p-10">
            {stores.length > 0 ? (
              <div>
                <h2 className="text-black text-lg font-bold mb-4">Danh sách cửa hàng</h2>
                {stores.map(store => (
                  <div key={store._id} className="p-6 mb-4 w-full mx-auto" onClick={() => handleStoreClick(store._id)}>
                    <div className="flex items-center bg-white p-4 shadow rounded-lg">
                      <img
                        src={store.Store_picture}
                        alt={store.Store_name}
                        className="w-10 h-10 object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-black font-semibold">{store.Store_name}</h3>
                        <p className="text-gray-600">{store.Store_address}</p>
                        <p className="text-gray-600">{store.Store_LoaiKD}</p>
                        <p className="text-gray-600">{store.Store_timeOpen} - {store.Store_timeClose}</p>
                      </div>
                      <div>
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-4">
                <img
                  src="https://th.bing.com/th/id/R.2962c4d86133dd9496e9e1ae5b77a855?rik=Mb7FgdfdjVhJog&pid=ImgRaw&r=0"
                  alt="No Store"
                  className="h-20 w-20 mx-auto"
                />
                <p className="text-lg mb-4">Không có quán nào</p>
                <button onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Tạo quán mới
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterStore;
