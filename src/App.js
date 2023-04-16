import React from 'react'
import {Route} from 'wouter'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import AboutUs from './pages/AboutUs'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
import Chat from './pages/Chat'
import InfoUser from './components/UserDashboard/components/InfoUser'
import LisfOfOrders from './components/UserDashboard/components/ListOfOrders'
import YourProducts from './components/UserDashboard/components/YourProducts'
import ProductSellerDetail from './components/UserDashboard/components/ProductSellerDetail'
import {InfoUserContextProvider} from './context/InfoUserContext'
import {UserTokenContextProvider} from './context/UserTokenContext'
import {InfoSearchedProduct} from './context/InfoSearchedProduct'
import {ProductsCartContextProvider} from './context/ProductsCartContext'
import { ActualFilterContextProvider } from './context/ActualFilterContext'
import "./vendor/bootstrap/css/bootstrap.min.css";
import 'bootstrap'
//import of context of user dasboard
import { ShowCreateProductModalContextProvider } from './components/UserDashboard/context/showCreateProductModalContext'
import { ShowEditProductModalContextProvider } from './components/UserDashboard/context/showEditProductModalContext'
import { UpdateListOfCategoriesProvider } from './components/UserDashboard/context/updateListOfCategories'
import { UpdateProductDetailProvider } from './components/UserDashboard/context/updateProductDetail'
import { UpdateProductsListProvider } from './components/UserDashboard/context/updateProductsList'


export default function App() {
  return(
    <div className = "App">
      <UserTokenContextProvider>
      <ProductsCartContextProvider>
        <InfoUserContextProvider>
          <ActualFilterContextProvider>
          <InfoSearchedProduct>
            <Route component = {ProductDetail} path = "/detail/:keyword"/>
            <Route component = {Home} path = "/"/>
            <Route component = {AboutUs} path = '/About_us'/>
            <Route component = {SignIn} path = '/login'/>
            <Route component = {SignUp} path = '/register'/>
            <Route component = {Contact} path = '/contact'/>
            <Route component = {Chat} path = '/chat'/>

            <ShowEditProductModalContextProvider>
            <ShowCreateProductModalContextProvider>
            <UpdateListOfCategoriesProvider>
            <UpdateProductDetailProvider>
            <UpdateProductsListProvider>
              <Route component = {InfoUser} path = '/user-profile/info'/>
              <Route component = {LisfOfOrders} path = '/user-profile/list-of-orders'/>
              <Route component = {YourProducts} path = '/user-profile/your-products'/>
              <Route component = {ProductSellerDetail} path = '/user-profile/your-products/product/:keyword'/>
            </UpdateProductsListProvider>    
            </UpdateProductDetailProvider>    
            </UpdateListOfCategoriesProvider>  
            </ShowCreateProductModalContextProvider>
            </ShowEditProductModalContextProvider>

          </InfoSearchedProduct>
          </ActualFilterContextProvider>
        </InfoUserContextProvider>
      </ProductsCartContextProvider>
      </UserTokenContextProvider>
    </div>
  
  )
}
