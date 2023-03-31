import React, {useEffect, useContext, useState} from 'react';
import OrdersTable from '../OrdersTable';
import NavBar from '../../../NavBar'
import OptionsNavBar from '../OptionsNavBar'
import getInfoUser from '../../../../services/getInfoUser'
import UserTokenContext from '../../../../context/UserTokenContext'
import InfoUserContext from '../../../../context/InfoUserContext'
import './index.css';

export default function ListOfOrders(){
    const {token} = useContext(UserTokenContext)
    const {setInfoUser} = useContext(InfoUserContext)
    const [info, setInfo] = useState(null)

    useEffect(() => {
        getInfoUser(token)
        .then(data => {
            setInfoUser(data)
            setInfo(data)
        })
    },[token])
    return(
        <div className = "Orders-Container">
            <NavBar/>
            <OptionsNavBar/>
            {info !== null && info !== undefined
            ?
            <div>
                {info.is_seller === true 
                ?
                <OrdersTable/>
                :
                <p className = "mensaje-debes-ser-vendedor">Debes ser vendedor para ver los pedidos</p>
            }
            </div>
            :
            null
            }
        </div>
    )
}