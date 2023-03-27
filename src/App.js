import React from 'react'
import {Route} from 'wouter'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import AboutUs from './pages/AboutUs'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import UserProfile from './pages/UserProfile'
import {CategoryContextProvider} from './context/CategoriesContext/index'
import {InfoUserContextProvider} from './context/InfoUserContext'
import {UserTokenContextProvider} from './context/UserTokenContext'
import {InfoSearchedProduct} from './context/InfoSearchedProduct'
import {ProductsCartContextProvider} from './context/ProductsCartContext'
import "./vendor/bootstrap/css/bootstrap.min.css";
import 'bootstrap'

export default function App() {
  return(
    <div className = "App">
      <UserTokenContextProvider>
      <ProductsCartContextProvider>
      <CategoryContextProvider>
        <InfoUserContextProvider>
          <InfoSearchedProduct>
            <Route component = {ProductDetail} path = "/detail/:keyword"/>
            <Route component = {Home} path = "/"/>
            <Route component = {AboutUs} path = '/About_us'/>
            <Route component = {SignIn} path = '/login'/>
            <Route component = {SignUp} path = '/register'/>
            <Route component = {Contact} path = '/contact'/>
            <Route component = {UserProfile} path = '/user-profile'/>
          </InfoSearchedProduct>
        </InfoUserContextProvider>
      </CategoryContextProvider>
      </ProductsCartContextProvider>
      </UserTokenContextProvider>
    </div>
  
  )
}
