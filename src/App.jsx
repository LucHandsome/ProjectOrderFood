import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom'
import DangNhap from './pages/DangNhap/DangNhap'
import DangKy from './pages/DangKy/DangKy'
import PasswordPage from './pages/DangKy/PasswordPage '
import RegisterStore from './pages/DangKy/RegisterStore'
import TenvaDiaChi from './pages/DangKy/TenvaDiaChi'
import InforStore from './pages/DangKy/InforStore'
import HomePageForStore from './pages/HomePage/HomePageForStore'
import ProfileDriver from './pages/Driver/ProfileDriver'
import OrderDriver from './pages/Driver/OrderDriver'
import LoginDriver from './pages/Driver/HomeDriver'
import DetailFood from './pages/Driver/RegisterDriver'
import HomeStore from './pages/Store/HomeStore'
import AddProduct from './pages/Product/AddProduct'
import NhomMonAnKem from './pages/MonAnKem/NhomMonAnKem'
import EditProduct from './pages/Product/EditProduct'
import LoaiMonAnKem from './pages/MonAnKem/LoaiMonAnKem'
import SettingStore from './pages/Store/SettingStore'
import LoginPage from './pages/Customer/LoginPage'
import SignUpPage from './pages/Customer/SignUpPage'
import Menu from './pages/Customer/Menu'
import RestaurantList from './pages/Customer/RestaurantList'
import { CustomerProvider } from './pages/Customer/CustomerContext'
import DriverRegister from './pages/Driver/RegisterDriver'
import DriverLogin from './pages/Driver/DriverLogin'
import HomeDriver from './pages/Driver/HomeDriver'
import CusHistory from './pages/Customer/CusHistory'
import CheckOut from './pages/Customer/Checkout'
import Order from './pages/Driver/Order'
import HistoryOrder from './pages/Driver/History'
import OrderOfStore from './pages/Store/OrderOfStore'
import PaymentResult from './pages/Customer/PaymentResult'
import CustomerPage from './pages/CustomerPage/CustomerPage'
import StorePage from './pages/StorePage/StorePage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <CustomerProvider>
            <Router>
              <Routes>
                <Route path='/' element={<HomePageForStore/>} />
                <Route path='/login' element={<DangNhap/>} />
                <Route path='/register' element={<DangKy/>} />
                <Route path='/registerpassword' element={<PasswordPage/>} />
                <Route path='/registerstore' element={<RegisterStore/>} />
                <Route path='/tenvadiachi' element={<TenvaDiaChi/>} />
                <Route path='/inforstore' element={<InforStore/>} />
                
                <Route path='/driverhome' element={<HomeDriver/>} />
                <Route path='/orderDriver' element={<OrderDriver/>} />
                <Route path='/order' element={<Order/>} />
                <Route path='/loginDriver' element={<DriverLogin/>} />
                <Route path='/registerDriver' element={<DriverRegister/>} />
                <Route path='/history' element={<HistoryOrder/>} />



                <Route path='/homestore/:storeId' element={<HomeStore/>} />
                <Route path='/addproduct/:storeId' element={<AddProduct/>} />
                <Route path='/editproduct/:productId' element={<EditProduct/>} />
                <Route path='/nhommonankem/:storeId' element={<NhomMonAnKem/>} />
                <Route path='/loaimonankem/:ToppingGroupID' element={<LoaiMonAnKem/>} />
                <Route path='/settingStore/:storeId' element={<SettingStore/>} />
                <Route path="/orderOfStore/:storeId" element={<OrderOfStore />} />


                <Route path='/loginpage' element={<LoginPage/>} />
                <Route path='/sign-up-page' element={<SignUpPage/>} />
                <Route path='/menu/:storeId' element={<Menu/>} />
                <Route path='/restaurantlist' element={<RestaurantList/>} />
                <Route path='/history' element={<CusHistory/>} />
                <Route path='/checkout/:storeId' element={<CheckOut/>} />
                <Route path="/payment/:id" element={<PaymentResult />} />


                <Route path="/customerPage" element={<CustomerPage />} />
                <Route path="/storePage" element={<StorePage />} />
                
              </Routes>
            </Router>                   
        </CustomerProvider>
      </div>
    </>
  )
}

export default App
