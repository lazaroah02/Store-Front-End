import React from 'react';
import UserDashboard from '../components/UserDashboard'
import {ActualComponentProvider} from '../components/UserDashboard/context/actualComponentContext'
import {ProductOfSellerDetailProvider} from '../components/UserDashboard/context/productOfSellerDetail'
import {UpdateListOfCategoriesProvider} from '../components/UserDashboard/context/updateListOfCategories'
import {ShowEditProductModalContextProvider} from '../components/UserDashboard/context/showEditProductModalContext'
import {ShowCreateProductModalContextProvider} from '../components/UserDashboard/context/showCreateProductModalContext'
import {UpdateProductsListProvider} from '../components/UserDashboard/context/updateProductsList'
import {UpdateProductDetailProvider} from '../components/UserDashboard/context/updateProductDetail'


export default function UserProfile(){
    return(
        <div>
            <ActualComponentProvider>
            <ProductOfSellerDetailProvider> 
            <UpdateListOfCategoriesProvider>
            <ShowEditProductModalContextProvider>
            <ShowCreateProductModalContextProvider>
            <UpdateProductsListProvider>   
            <UpdateProductDetailProvider>
                <UserDashboard/>
            </UpdateProductDetailProvider>
            </UpdateProductsListProvider>     
            </ShowCreateProductModalContextProvider>    
            </ShowEditProductModalContextProvider>
            </UpdateListOfCategoriesProvider>
            </ProductOfSellerDetailProvider>       
            </ActualComponentProvider>
        </div>
    )
}