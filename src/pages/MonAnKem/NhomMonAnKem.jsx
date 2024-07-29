import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const NhomMonAnKem = () => {
    const [toppingGroups, setToppingGroups] = useState([]);
    const [newToppingGroupName, setNewToppingGroupName] = useState('');
    const [editToppingGroupName, setEditToppingGroupName] = useState('');
    const [editToppingGroupId, setEditToppingGroupId] = useState(null);
    const { storeId } = useParams(); // Lấy storeId từ URL
    const navigate = useNavigate();

    useEffect(() => {
        fetchToppingGroups();
    }, [storeId]);

    const fetchToppingGroups = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/toppingGroup/getalltopping-group/${storeId}`);
            setToppingGroups(response.data.data);
        } catch (error) {
            console.error('Error fetching topping groups:', error);
        }
    };
    

    const handleAddToppingGroup = async () => {
        try {
            await axios.post(`http://localhost:3001/api/toppingGroup/addtopping-group/${storeId}`, {
                toppingGroupName: newToppingGroupName
            });
            fetchToppingGroups();
            setNewToppingGroupName('');
        } catch (error) {
            console.error('Error adding topping group:', error);
        }
    };

    const handleUpdateToppingGroup = async (id) => {
        try {
            await axios.put(`http://localhost:3001/api/toppingGroup/updatetopping-group/${id}`, {
                toppingGroupName: editToppingGroupName
            });
            fetchToppingGroups();
            setEditToppingGroupId(null);
            setEditToppingGroupName('');
        } catch (error) {
            console.error('Error updating topping group:', error);
        }
    };

    const handleDeleteToppingGroup = async (id) => {
        const confirmDelete = window.confirm("Bạn có muốn xóa nhóm topping này không?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/api/toppingGroup/deletetopping-group/${id}`);
                fetchToppingGroups();
            } catch (error) {
                console.error('Error deleting topping group:', error);
            }
        }
    };

    const handleAddTopping = (id) => {
        navigate(`/loaimonankem/${id}`);
    };

    return (
        <div>
            <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Thêm nhóm Topping</h1>
            </header>
            <div className="p-10">
                <h2 className="text-xl font-semibold mb-4">Topping Groups</h2>
                <ul className="space-y-2">
                    {toppingGroups.map((group) => (
                        <li key={group._id} className="p-4 bg-white shadow rounded-md flex justify-between items-center">
                            {editToppingGroupId === group._id ? (
                                <input
                                    type="text"
                                    value={editToppingGroupName}
                                    onChange={(e) => setEditToppingGroupName(e.target.value)}
                                    className="p-2 border rounded-md"
                                />
                            ) : (
                                <span>{group.toppingGroupName}</span>
                            )}
                            <div className="flex space-x-2">
                                {editToppingGroupId === group._id ? (
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleUpdateToppingGroup(group._id)}
                                    >
                                        Lưu
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => {
                                                setEditToppingGroupId(group._id);
                                                setEditToppingGroupName(group.toppingGroupName);
                                            }}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDeleteToppingGroup(group._id)}
                                        >
                                            Xóa
                                        </button>
                                        <button
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleAddTopping(group._id)}
                                        >
                                            Thêm Topping
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <input
                        type="text"
                        value={newToppingGroupName}
                        onChange={(e) => setNewToppingGroupName(e.target.value)}
                        placeholder="Tên nhóm topping mới"
                        className="p-2 border rounded-md"
                    />
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={handleAddToppingGroup}
                    >
                        Thêm nhóm Topping
                    </button>
                </div>
                <button
                    className="mt-4 w-1/10 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300 shadow-md transform"
                    onClick={() => navigate(-1)}
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
};

export default NhomMonAnKem;
