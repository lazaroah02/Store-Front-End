import React, {useState, useContext, useEffect} from 'react';
import NavBar from '../NavBar'
import OptionsNavBar from './components/OptionsNavBar'
import InfoUser from './components/InfoUser'
import YourProducts from './components/YourProducts'
import ProductsSold from './components/ProductsSold'
import ListOfOrders from './components/ListOfOrders'
import ActualComponentContext from './context/actualComponentContext'

export default function UserDashboard(){
    const {actualComponent,} = useContext(ActualComponentContext)
    const [component, setComponent] = useState(actualComponent)

    useEffect(() => {
        setComponent(actualComponent)
    },[actualComponent])
    return(
        <div>
            <NavBar/>
            <OptionsNavBar/>
            {component === 'info-user'?<InfoUser/>:null}
            {component === 'your-products'?<YourProducts/>:null}
            {component === 'products-sold'?<ProductsSold/>:null}
            {component === 'list-of-orders'?<ListOfOrders/>:null}
        </div>
    )
}