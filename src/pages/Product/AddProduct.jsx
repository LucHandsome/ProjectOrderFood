import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const handleBackClick = () => navigate(-1);
    const { storeId } = useParams(); 
    const [products, setProducts] = useState([]);
    const [store, setStore] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [foodID, setFoodId] = useState('');
    const [foodName, setFoodName] = useState('');
    const [foodDetail, setFoodDetail] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [FoodPicture, setFoodPicture] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const storeResponse = await axios.get(`http://localhost:3001/api/store/get-store/${storeId}`);
                console.log("Store data:", storeResponse.data); // Kiểm tra dữ liệu cửa hàng
                setStore(storeResponse.data.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error);
                setError('Không thể tải thông tin trang thêm sản phẩm');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [storeId]);

    const handleButtonClick = async (event) => {
        event.preventDefault();
      
        // Kiểm tra nếu tất cả các trường bắt buộc đã được điền
        if (!foodID || !foodName || !foodPrice || !foodDetail) {
            toast.error('Vui lòng điền đầy đủ thông tin món ăn.', {
                position: 'top-center',
                autoClose: 3000
            });
            return;
        }
      
        const formData = {
            Food_id: foodID,
            Food_name: foodName,
            Food_detail: foodDetail,
            Price: foodPrice, // Có thể là 'Open' hoặc 'Closed'
            Food_picture: FoodPicture,
            Store_id: storeId
        };
      
        try {
            const response = await axios.post('http://localhost:3001/api/product/create-product', formData);
      
            if (response.data.status === 'OK') {
                toast.success('Tạo món ăn thành công!', {
                    position: 'top-center',
                    autoClose: 3000
                });
                setTimeout(() => navigate(`/homestore/${storeId}`), 3000);
            } else {
                toast.error(`Lỗi: ${response.data.message}`, {
                    position: 'top-center',
                    autoClose: 3000
                });
            }
        } catch (error) {
            console.error('Error creating food:', error);
            toast.error('Đã xảy ra lỗi khi tạo món ăn. Vui lòng thử lại.', {
                position: 'top-center',
                autoClose: 3000
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>{error}</p>
                <button onClick={handleBackClick} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-300 min-h-screen flex items-center justify-center bg-cover bg-center p-4">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-md">
                <img 
                    src={store?.Store_picture} 
                    alt="Food"
                    className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">THÊM MÓN MỚI</h2>
                <form onSubmit={handleButtonClick}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Hình ảnh (URL)</label>
                        <input
                            type="text"
                            id="foodpicture"
                            name="foodpicture"
                            placeholder="Chọn ảnh"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                            value={FoodPicture}
                            onChange={(e) => setFoodPicture(e.target.value)}
                            required
                        />
                        {FoodPicture && <img src={FoodPicture} alt="Food Preview" className="mt-4 w-full h-auto" />}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Mã sản phẩm</label>
                        <input
                            type="text"
                            required
                            placeholder="Nhập mã món"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                            value={foodID}
                            onChange={(e) => setFoodId(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tên món ăn</label>
                        <input
                            type="text"
                            required
                            placeholder="Nhập tên món"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Giá</label>
                        <input
                            type="number"
                            required
                            placeholder="Nhập giá"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                            value={foodPrice}
                            onChange={(e) => setFoodPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            placeholder="Nhập mô tả món ăn"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500"
                            value={foodDetail}
                            onChange={(e) => setFoodDetail(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        Lưu
                    </button>
                    <button
                        className="mt-4 w-full bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md transform"
                        onClick={handleBackClick}
                    >
                        Quay lại
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default AddProduct;
