import React from "react";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
const TenvaDiaChi = () =>{
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Quay lại trang trước
    };
    const handleButtonClick = () => {
        navigate('/inforstore');
    };
    return(
        <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center fixed w-full top-0 left-0">
        <h1 className="text-xl font-bold">Đăng Ký Quán</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center w-full">
        <p className="text-lg mb-4">Bạn có chắc chắn cửa hàng của bạn đã có trên AppDatDoAn?</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
            <input type="text" className="flex-grow sm:w-2/3 px-3 py-2 border rounded-lg" placeholder="Tên cửa hàng" />
            <input type="text" className="flex-grow sm:w-1/3 px-3 py-2 border rounded-lg" placeholder="Tỉnh/Thành phố" />
            <button onClick={handleButtonClick} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg flex-shrink-0">
            Đăng ký
            </button>
        </div>
        </div>
      </main>
    </div>
    )
}
export default TenvaDiaChi