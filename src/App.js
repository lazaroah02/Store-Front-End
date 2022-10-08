import React from 'react'
import {Route} from 'wouter'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import AboutUs from './pages/AboutUs'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {CategoryContextProvider} from './context/CategoriesContext/index'
import {InfoUserContextProvider} from './context/InfoUserContext'
import {UserTokenContextProvider} from './context/UserTokenContext'
import {InfoSearchedProduct} from './context/InfoSearchedProduct'
import {ProductsCartContextProvider} from './context/ProductsCartContext'
import bootstrap from 'bootstrap'

export default function App() {
  return(
    <div>
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
          </InfoSearchedProduct>
        </InfoUserContextProvider>
      </CategoryContextProvider>
      </ProductsCartContextProvider>
      </UserTokenContextProvider>
    </div>
  
  )
}
