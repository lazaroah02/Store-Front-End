import React, {useState, useContext, useEffect} from 'react';
import NavBar from '../NavBar'
import OptionsNavBar from './components/OptionsNavBar'
import InfoUser from './components/InfoUser'
import YourProducts from './components/YourProducts'
import ProductsSold from './components/ProductsSold'
import ListOfOrders from './components/ListOfOrders'
import ProductSellerDetail from './components/ProductSellerDetail'
import ActualComponentContext from './context/actualComponentContext'
import UserTokenContext from '../../context/UserTokenContext';
import './index.css'

export default function UserDashboard(){
    const {actualComponent,} = useContext(ActualComponentContext)
    const [component, setComponent] = useState(actualComponent)
    const {token} = useContext(UserTokenContext)

    useEffect(() => {
        setComponent(actualComponent)
    },[actualComponent])
    return(
        <div>
            <NavBar/>
            {token !== undefined && token !== null
            ?
            <div>
                <OptionsNavBar/>
                {component === 'info-user'?<InfoUser/>:null}
                {component === 'your-products'?<YourProducts/>:null}
                {component === 'products-sold'?<ProductsSold/>:null}
                {component === 'list-of-orders'?<ListOfOrders/>:null}
                {component === 'product-seller-detail'?<ProductSellerDetail/>:null}
            </div>
            :
            null
            }
            
        </div>
    )
}