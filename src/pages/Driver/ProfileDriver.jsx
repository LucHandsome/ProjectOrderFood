import React from 'react'

const ProfileDriver = () => {
  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center items-center p-4'>
        <div className='bg-white rounded-2xl border-2 px-6 py-12 max-w-lg w-full'>
          <div className='flex justify-center text-2xl md:text-5xl font-bold mb-4'>
            Thông tin cá nhân
          </div>
          <div className='flex justify-center items-center mt-5'>
            <img src="https://i.pinimg.com/originals/bb/2a/93/bb2a93a4533db85e948abb3e86debcf5.jpg" className='h-[100px] w-[100px]' alt="Profile" />
          </div>

          <div className='flex flex-col lg:flex-row lg:space-x-3 mt-4'>
            <div className='flex-1 mt-4'>
              <label htmlFor="driverName" className='text-base font-bold'>Tên tài xế</label>
              <input id="driverName" type="text" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent' placeholder='Tên tài xế của bạn' />
            </div>
            <div className='flex-1 mt-4'>
              <label htmlFor="dob" className='text-base font-bold'>Ngày sinh</label>
              <input id="dob" type="text" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent' placeholder='MM/DD/YYYY' />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row lg:space-x-3 mt-4'>
            <div className='flex-1 mt-4'>
              <label htmlFor="phone" className='text-base font-bold'>Số điện thoại</label>
              <input id="phone" type="text" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent' placeholder='+84' />
            </div>
            <div className='flex-1 mt-4'>
              <label htmlFor="email" className='text-base font-bold'>Email</label>
              <input id="email" type="text" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent' placeholder='Email của bạn' />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row lg:space-x-3 mt-4'>
            <div className='flex-1 mt-4'>
              <label htmlFor="gender" className='text-base font-bold'>Giới tính</label>
              <select id="gender" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent'>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col lg:flex-row lg:space-x-3 mt-4'>
            <div className='flex-1 mt-4'>
              <label htmlFor="license" className='text-base font-bold'>Bằng lái xe</label>
              <input id="license" type="text" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent' placeholder='Bằng lái xe của bạn' />
            </div>
            <div className='flex-1 mt-4'>
              <label htmlFor="licensePlate" className='text-base font-bold'>Biển số xe</label>
              <input id="licensePlate" type="text" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent' placeholder='Biển số xe của bạn' />
            </div>
          </div>

          <div className='flex flex-col lg:flex-row lg:space-x-3 mt-4'>
            <div className='flex-1 mt-4'>
              <label htmlFor="emergencyContact" className='text-base font-bold'>Thông tin liên hệ khẩn cấp</label>
              <input id="emergencyContact" type="text" className='w-full border-2 rounded-lg border-gray-200 p-3 mt-1 bg-transparent' placeholder='Nhập thông tin liên hệ' />
            </div>
          </div>

          <button className='w-full bg-black text-white rounded-lg p-3 mt-8'>
            Lưu
          </button>
        </div>
      </div>
    </>
  )
}

export default ProfileDriver
