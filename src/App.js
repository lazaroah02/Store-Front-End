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
import Chat from './pages/Chat'
import InfoUser from './components/UserDashboard/components/InfoUser'
import LisfOfOrders from './components/UserDashboard/components/ListOfOrders'
import YourProducts from './components/UserDashboard/components/YourProducts'
import ProductSellerDetail from './components/UserDashboard/components/ProductSellerDetail'

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
        <div className = "App">
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
              <Route path = '/chat/:usernameToChat' element = {<ProtectedRoute><Chat/></ProtectedRoute>}/>
              <Route path = '/chat' element = {<ProtectedRoute><Chat/></ProtectedRoute>}/>
              <Route path = '/user/info' element = {<ProtectedRoute><InfoUser/></ProtectedRoute>} />
              <Route path = '/user/seller/list-of-orders'element = {<ProtectedRoute><LisfOfOrders/></ProtectedRoute>} />
              <Route path = '/user/seller/products' element = {<ProtectedRoute><YourProducts/></ProtectedRoute>} />
              <Route path = '/user/seller/product/:keyword' element = {<ProtectedRoute><ProductSellerDetail/></ProtectedRoute>} />
            </Routes>
        </ProductsCartContextProvider>
        </InfoUserContextProvider>
        </div>
      </Router>  
  )
}
