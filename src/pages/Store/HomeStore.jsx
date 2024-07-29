import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeStore = () => {
    const { storeId } = useParams(); 
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const storeResponse = await axios.get(`http://localhost:3001/api/store/get-store/${storeId}`);
                setStore(storeResponse.data.data);
    
                const productResponse = await axios.get(`http://localhost:3001/api/product/get-products-by-store/${storeId}`);
                setProducts(productResponse.data.data);
    
                setLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error);
                setError('Không thể tải thông tin cửa hàng hoặc sản phẩm');
                setLoading(false);
            }
        };
    
        fetchStore();
    }, [storeId]);

    const handleNextPageClick = () => {
        navigate(`/nhommonankem/${storeId}`);
    };

    const handleAddProductClick = () => {
        navigate(`/addproduct/${storeId}`);
    };

    const handleEditProductClick = (productId) => {
        navigate(`/editproduct/${productId}`);
    };

    const handleSettingStoreClick = () => {
        navigate(`/settingStore/${storeId}`);
    };

    const handleOrderClick = () => {
        navigate(`/orderOfStore/${storeId}`);
    };

    const handleDeleteProductClick = async (productId) => {
        const confirmDelete = window.confirm("Bạn có muốn xóa món ăn này không?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/product/delete-product/${productId}`);
                setProducts(products.filter(product => product._id !== productId));
            } catch (error) {
                console.error('Error deleting product:', error);
                setError('Đã xảy ra lỗi khi xóa món ăn. Vui lòng thử lại.');
            }
        }
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
                <button onClick={handleAddProductClick} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Tạo món mới
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">{store?.Store_name}</h1>
                <nav className="flex space-x-4">
                    <button onClick={handleAddProductClick} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                        Thêm món
                    </button>
                    <button onClick={handleNextPageClick} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                        Thêm Topping
                    </button>
                    <button onClick={handleSettingStoreClick} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                        Cài đặt cửa hàng
                    </button>
                    <button onClick={handleOrderClick} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                        Đơn hàng
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="p-4">
                <h2 className="text-lg font-bold mb-4">Danh sách món ăn</h2>
                <div className="bg-white p-4 shadow rounded-lg mb-4">
                    {products.map((item) => (
                        <div key={item._id} className="flex items-center mb-4">
                            <img
                                src={item.Food_picture}
                                alt={item.Food_name}
                                className="w-20 h-20 object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-black font-semibold">{item.Food_name}</h3>
                                <p className="text-gray-600">{item.Price}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button onClick={handleAddProductClick} className="text-blue-500">Thêm</button>
                                <button onClick={() => handleEditProductClick(item._id)} className="text-green-500">Sửa</button>
                                <button onClick={() => handleDeleteProductClick(item._id)} className="text-red-500">Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomeStore;
