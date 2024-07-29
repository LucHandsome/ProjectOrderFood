import React, { useState } from 'react';

const CusOrder1 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState({
    com: false,
    canh: false,
    ca: false
  });

  // Danh sách các card với thông tin cần thiết
  const cards = [
    { id: 1, name: 'Bánh mì 1', price: '1000 VND', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx_b-E5Z3lqjttsuB6p-ZfKjT-YFgqhicSOg&s' },
    { id: 2, name: 'Bánh mì 2', price: '1200 VND', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx_b-E5Z3lqjttsuB6p-ZfKjT-YFgqhicSOg&s' },
    { id: 3, name: 'Bánh mì 3', price: '1500 VND', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx_b-E5Z3lqjttsuB6p-ZfKjT-YFgqhicSOg&s' },
    { id: 4, name: 'Bánh mì 4', price: '1800 VND', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx_b-E5Z3lqjttsuB6p-ZfKjT-YFgqhicSOg&s' },
  ];

  const handleIconClick = (cardIndex) => {
    setSelectedCard(cardIndex);
    setIsMenuOpen(true);
  };

  const handleToppingChange = (e) => {
    const { name, checked } = e.target;
    setSelectedToppings(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleContinue = () => {
    setIsMenuOpen(false);
    console.log('Selected Toppings:', selectedToppings);
  };

  // Lấy thông tin của card đang được chọn
  const card = cards[selectedCard] || {};

  return (
    <>
      <div className='flex flex-wrap w-full items-center justify-center lg:mx-auto lg:space-x-3'>
        {cards.map((item, index) => (
          <div key={index} className='flex w-max border-gray-500 border-2 rounded px-3 py-3 m-5'>
            <img src={item.imageUrl} alt={item.name} className='w-[100px] h-[100px] rounded-lg' />
            <div className='ml-4 flex-1'>
              <div>{item.name}</div>
              <div className='flex space-x-2'>
                <div>Đơn giá:</div>
                <div>{item.price}</div>
              </div>
            </div>
            <div className='self-end'>
              <img src="https://cdn-icons-png.flaticon.com/128/32/32563.png" className='h-[20px] w-[20px] cursor-pointer' onClick={() => handleIconClick(index)} />
            </div>
          </div>
        ))}
      </div>
      
      {isMenuOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end'>
          <div className='bg-white w-[300px] h-full p-5 flex flex-col'>
            <div className='flex items-center mb-4'>
              <img src={card.imageUrl} alt={card.name} className='w-[100px] h-[100px] rounded-lg' />
              <div className='ml-4'>
                <h2 className='text-3xl font-bold'>{card.name}</h2>
                <div className='flex space-x-2'>
                  <div>Đơn giá:</div>
                  <div>{card.price}</div>
                </div>
              </div>
            </div>
            <h3 className='text-2xl mb-4 font-bold'>Chọn topping</h3>
            <div className='flex-1 space-y-2'>
              <label className='flex items-center justify-start'>
                <input type="checkbox" name="com" className='h-[30px] w-[30px]' checked={selectedToppings.com} onChange={handleToppingChange} />
                <span className='text-2xl ml-3'>Cơm</span>
              </label>
              <label className='flex items-center justify-start'>
                <input type="checkbox" name="canh" className='h-[30px] w-[30px]' checked={selectedToppings.canh} onChange={handleToppingChange} />
                <span className='text-2xl ml-3'>Canh</span>
              </label>
              <label className='flex items-center justify-start'>
                <input type="checkbox" name="ca" className='h-[30px] w-[30px]' checked={selectedToppings.ca} onChange={handleToppingChange} />
                <span className='text-2xl ml-3'>Cá</span>
              </label>
            </div>
            <button onClick={handleContinue} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full'>
              Thêm vào giỏ hàng 
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CusOrder1;
