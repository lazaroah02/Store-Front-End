import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

//pages import
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import AboutUs from './pages/AboutUs'
import ShowProducts from './pages/ShowProducts'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import InfoUser from './components/UserDashboard/components/InfoUser'
import LisfOfOrders from './components/UserDashboard/components/ListOfOrders'
import YourProducts from './components/UserDashboard/components/ProductsOfSeller'
import ProductSellerDetail from './components/UserDashboard/components/ProductSellerDetail'
import FavoriteList from './components/UserDashboard/components/FavoriteProductsList'
import OrdersHistory from './components/UserDashboard/components/OrdersHistory'
import OrderDetail from './components/UserDashboard/components/OrderDetail'
import Page404 from './pages/Page404'

//context import
import {InfoUserContextProvider} from './context/InfoUserContext'
import {ProductsCartContextProvider} from './context/ProductsCartContext'

//import ProtectedRoute from "./components/ProtectedRoute"
import ProtectedRoute from "./components/ProtectedRoute"

//others import
import "./vendor/bootstrap/css/bootstrap.min.css";
import 'bootstrap'

export default function App() {
  return(
    <Router>
        <>
        <InfoUserContextProvider>
        <ProductsCartContextProvider>
            <Routes>
              <Route path = "/" element = {<Home/>}/>
              <Route exact path = "/detail/:keyword" element = {<ProductDetail/>} />
              <Route path = '/about-us' element = {<AboutUs/>} />
              <Route path = '/login' element = {<SignIn/>} />
              <Route path = '/products' element = {<ShowProducts/>} />
              <Route path = '/products/:filters' element = {<ShowProducts/>} />
              <Route path = '/register' element = {<SignUp/>} />
              <Route path = '/contact' element = {<ProtectedRoute><Contact/></ProtectedRoute>}/>
              <Route path = '/user/info' element = {<ProtectedRoute><InfoUser/></ProtectedRoute>} />
              <Route path = '/user/favorite-list' element = {<ProtectedRoute><FavoriteList/></ProtectedRoute>} />
              <Route path = '/user/orders-history' element = {<ProtectedRoute><OrdersHistory/></ProtectedRoute>} />
              <Route path = '/user/order-detail/:orderId' element = {<ProtectedRoute><OrderDetail/></ProtectedRoute>} />
              <Route path = '/user/seller/list-of-orders'element = {<ProtectedRoute><LisfOfOrders/></ProtectedRoute>} />
              <Route path = '/user/seller/products' element = {<ProtectedRoute><YourProducts/></ProtectedRoute>} />
              <Route path = '/user/seller/product/:keyword' element = {<ProtectedRoute><ProductSellerDetail/></ProtectedRoute>} />
              <Route path = '*' element = {<Page404/>} />
            </Routes>
        </ProductsCartContextProvider>
        </InfoUserContextProvider>
        </>
      </Router>  
  )
}
