import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const DriverRegister = () => {
  const [driverName, setDriverName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmP, setConfirmP] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [registerType, setRegisterType] = useState('');
  const navigate = useNavigate();


  const check = async () => {
    if (!driverName || !birthday || !phoneNumber || !email || !password || !confirmP || !gender || !city || !registerType) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    if (password !== confirmP) {
      alert('Mật khẩu không trùng khớp');
      return;
    }

    const payload = {
      name: driverName,
      dateOfBirth: new Date(birthday), // Chuyển đổi sang Date object
      phoneNumber,
      email,
      password,
      gender,
      registeredCity: city,
      registrationType: registerType
    };

    console.log('Payload:', payload);

    try {
      const response = await axios.post('http://localhost:3001/api/driver/signup', payload);

      if (response.data.status === 'OK') {
        alert('Đăng ký thành công');
        navigate('/loginDriver');
        // Reset form hoặc chuyển hướng đến trang khác nếu cần
      } else {
        alert(`Đăng ký thất bại: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Đăng ký thất bại:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại sau');
    }
  };

  return (
    <>
      <div id="container" className='flex items-center justify-center w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
          <div className='bg-white px-6 py-12 rounded-2xl border-2'>
            <h1 className='text-4xl font-semibold'>Đăng ký đối tác tài xế</h1>
            <p className='text-base text-gray-500 mt-2 font-medium'>
              Vui lòng nhập đầy đủ thông tin bên dưới để trở thành đối tác
            </p>
            <div className='mt-6'>
              <div className='flex flex-col lg:flex-row lg:space-x-3 mb-4'>
                <div className='flex-1'>
                  <label className='text-base font-medium'>Tên tài xế</label>
                  <input
                    className='w-full border-2 border-gray-200 rounded-lg p-3 mt-1 bg-transparent'
                    placeholder='Nhập tên tài xế của bạn'
                    onChange={(a) => setDriverName(a.target.value)}
                  />
                </div>
                <div className='flex-1 mt-3 lg:mt-0'>
                  <label className='text-base font-medium'>Ngày sinh</label>
                  <input
                    className='w-full border-2 border-gray-200 rounded-lg p-3 mt-1 bg-transparent'
                    placeholder='MM/DD/YYYY'
                    type="date" // Chuyển sang type date để dễ dàng chọn ngày
                    onChange={(a) => setBirthday(a.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-col lg:flex-row lg:space-x-3 mb-4'>
                <div className='flex-1'>
                  <label className='text-base font-medium'>Số điện thoại</label>
                  <input
                    className='w-full border-2 border-gray-200 rounded-lg p-3 mt-1 bg-transparent'
                    placeholder='+84'
                    onChange={(a) => setPhoneNumber(a.target.value)}
                  />
                </div>
                <div className='flex-1 mt-3 lg:mt-0'>
                  <label className='text-base font-medium'>Email</label>
                  <input
                    className='w-full border-2 border-gray-200 rounded-lg p-3 mt-1 bg-transparent'
                    placeholder='Email của bạn'
                    onChange={(a) => setEmail(a.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-col lg:flex-row lg:space-x-3 mb-4'>
                <div className='flex-1'>
                  <label className='text-base font-medium'>Mật khẩu</label>
                  <input
                    className='w-full border-2 border-gray-200 rounded-lg p-3 mt-1 bg-transparent'
                    placeholder='Nhập mật khẩu'
                    type='password'
                    onChange={(a) => setPassword(a.target.value)}
                  />
                </div>
                <div className='flex-1 mt-3 lg:mt-0'>
                  <label className='text-base font-medium'>Nhập lại mật khẩu</label>
                  <input
                    className='w-full border-2 border-gray-200 rounded-lg p-3 mt-1 bg-transparent'
                    placeholder='Nhập lại mật khẩu'
                    type='password'
                    onChange={(a) => setConfirmP(a.target.value)}
                  />
                </div>
              </div>
              
              <div className='mt-4'>
                <label className='text-base font-medium'>Giới tính</label>
                <select name="gender" className='w-full border-2 border-gray-300 rounded-lg p-3 mt-1 bg-transparent' onChange={(a) => setGender(a.target.value)}>
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              
              <div className='flex flex-col lg:flex-row lg:space-x-3 mt-4'>
                <div className='flex-1'>
                  <label className='text-base font-medium'>Thành phố đăng ký hoạt động</label>
                  <input
                    className='w-full border-2 border-gray-200 rounded-lg p-3 mt-1 bg-transparent'
                    placeholder='Thành phố'
                    onChange={(a) => setCity(a.target.value)}
                  />
                </div>
                <div className='flex-1 mt-3 lg:mt-0'>
                  <label className='text-base font-medium'>Loại hình đăng kí</label>
                  <select name="loaiDangki" className='w-full border-2 border-gray-300 rounded-lg p-3 mt-1 bg-transparent' onChange={(a) => setRegisterType(a.target.value)}>
                    <option value="">Chọn loại hình</option>
                    <option value="Fulltime">Fulltime</option>
                    <option value="Parttime">Parttime</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <button className='bg-black text-white text-base font-bold py-3 px-6 rounded-lg w-full' onClick={check}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverRegister;
