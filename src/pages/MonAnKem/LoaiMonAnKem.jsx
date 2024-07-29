import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoaiMonAnKem = () => {
    const navigate = useNavigate();
    const { ToppingGroupID } = useParams();
    const [toppings, setToppings] = useState([]);
    const [toppingGroup, setToppingGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formMode, setFormMode] = useState(null); // 'create' or 'edit'
    const [currentTopping, setCurrentTopping] = useState(null);
    const [toppingName, setToppingName] = useState('');

    useEffect(() => {
        const fetchToppingData = async () => {
            if (!ToppingGroupID) {
                setError('Không có topping group ID');
                setLoading(false);
                return;
            }

            try {
                const toppingGroupResponse = await axios.get(`http://localhost:3001/api/toppingGroup/get-toppingGroup-by-id/${ToppingGroupID}`);
                console.log('Topping Group Data:', toppingGroupResponse.data.data);
                setToppingGroup(toppingGroupResponse.data.data);

                const toppingResponse = await axios.get(`http://localhost:3001/api/topping/get-topping-by-group/${ToppingGroupID}`);
                console.log('Toppings Data:', toppingResponse.data.data);
                setToppings(toppingResponse.data.data);

                setLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error);
                setError('Không thể tải thông tin topping hoặc nhóm topping');
                setLoading(false);
            }
        };

        fetchToppingData();
    }, [ToppingGroupID]);

    useEffect(() => {
        console.log('Current toppings state:', toppings);
    }, [toppings]);

    const handleAddToppingClick = () => {
        setFormMode('create');
        setCurrentTopping(null);
        setToppingName('');
    };

    const handleEditToppingClick = (topping) => {
        setFormMode('edit');
        setCurrentTopping(topping);
        setToppingName(topping.toppingName);
    };

    const handleDeleteToppingClick = async (toppingId) => {
        const confirmDelete = window.confirm("Bạn có muốn xóa loại topping này không?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/topping/delete-topping/${toppingId}`);
                setToppings(toppings.filter(topping => topping._id !== toppingId));
                toast.success('Topping đã được xóa thành công!');
            } catch (error) {
                console.error('Error deleting topping:', error);
                toast.error('Đã xảy ra lỗi khi xóa topping. Vui lòng thử lại.');
            }
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                toppingName,
                type: toppingGroup?.toppingGroupName
            };

            console.log("Submitting payload:", payload);

            if (formMode === 'create') {
                const response = await axios.post(`http://localhost:3001/api/topping/add-topping/${ToppingGroupID}`, payload);
                setToppings(prevToppings => [...prevToppings, response.data.data]);
                toast.success('Topping đã được thêm thành công!');
            } else if (formMode === 'edit' && currentTopping) {
                await axios.put(`http://localhost:3001/api/topping/update-topping/${currentTopping._id}`, { toppingName });
                setToppings(prevToppings => 
                    prevToppings.map(topping => 
                        topping._id === currentTopping._id ? { ...topping, toppingName } : topping
                    )
                );
                toast.success('Topping đã được cập nhật thành công!');
            }

            setToppingName('');
            setFormMode(null);
            setCurrentTopping(null);
        } catch (error) {
            console.error('Error saving topping:', error);
            toast.error('Đã xảy ra lỗi khi lưu topping. Vui lòng thử lại.');
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
                <button onClick={handleAddToppingClick} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Tạo topping mới
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <ToastContainer />
            <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">{toppingGroup?.toppingGroupName}</h1>
            </header>
            <div className="p-10">
                <h2 className="text-xl font-semibold mb-4">Danh sách topping</h2>
                {toppings.length > 0 ? (
                    <ul className="space-y-2">
                        {toppings.map((topping) => (
                            <li key={topping._id} className="p-4 bg-white shadow rounded-md flex justify-between items-center">
                                <span>{topping.toppingName}</span>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleEditToppingClick(topping)} 
                                        className="text-green-500 hover:bg-green-100 px-2 py-1 rounded"
                                    >
                                        Sửa
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteToppingClick(topping._id)} 
                                        className="text-red-500 hover:bg-red-100 px-2 py-1 rounded"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có topping nào.</p>
                )}
                <button
                    className="mt-4 w-1/10 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md transform"
                    onClick={() => navigate(-1)}
                >
                    Quay lại
                </button>
                <button
                    onClick={handleAddToppingClick}
                    className="mt-4 w-1/4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300 shadow-md transform"
                >
                    Thêm Topping
                </button>

                {formMode && (
                    <div className="mt-8 p-4 bg-white shadow rounded-md">
                        <h3 className="text-lg font-semibold mb-4">{formMode === 'create' ? 'Thêm Topping' : 'Sửa Topping'}</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toppingName">
                                    Tên Topping
                                </label>
                                <input
                                    type="text"
                                    id="toppingName"
                                    value={toppingName}
                                    onChange={(e) => setToppingName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            {formMode === 'create' && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Loại Topping
                                    </label>
                                    <input
                                        type="text"
                                        id="type"
                                        value={toppingGroup?.toppingGroupName || ''}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        readOnly
                                    />
                                </div>
                            )}
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    {formMode === 'create' ? 'Thêm' : 'Cập nhật'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormMode(null)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoaiMonAnKem;
