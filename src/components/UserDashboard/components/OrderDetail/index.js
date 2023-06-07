import React, {useEffect, useState, useContext, useRef} from 'react';
import { useParams } from 'react-router-dom';
import {getOrderDetail} from'../../../../services/getOrderDetail';
import InfoUserContext from '../../../../context/InfoUserContext'
import Loader from '../../../Loader'
import NavBar from '../../../NavBar'
import OptionsNavBar from '../OptionsNavBar'
import { useShowFloatMessage } from '../../../../customHooks/useShowFloatMessage';
import './index.css'
import '../user-dashboard-panel-styles.css'

function OrderDetail() {
    const {orderId} = useParams()
    const [orderDetail, setOrderDetail]= useState(null)
    const [loading, setLoading] = useState(false)
    const {infoUser} = useContext(InfoUserContext)
    const parentRef = useRef()
    const {showFloatMessage} = useShowFloatMessage({parentRef:parentRef})

    useEffect(() => {
        if(orderId !== undefined && orderId !== null){
            setLoading(true)
            getOrderDetail({token:infoUser.token, orderId:orderId})
            .then(data => {
                setOrderDetail(data)
                setLoading(false)
            })
        }
    }, [orderId])

    return ( 
    <div className = "user-dashboard-panel-container" > 
        <NavBar/>
        <OptionsNavBar/>
        <div className = "user-dashboard-panel">
            <div ref = {parentRef}></div>
            <button onClick = {() => showFloatMessage({message:"Hello World"})}>Mostrar</button>
            {loading?
                <div className = "loader-container">
                    <Loader/>
                </div>
                :
                <div className = "order-detail-container">
                    Pedido: {orderId}
                </div>
            }
        </div>
    </div> 
    );
}

export default OrderDetail;