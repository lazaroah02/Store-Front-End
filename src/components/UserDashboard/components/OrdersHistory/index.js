import React, {useEffect, useState, useContext} from 'react';
import NavBar from '../../../NavBar'
import Loader from '../../../Loader';
import InfoUserContext from '../../../../context/InfoUserContext';
import { getOrdersHistory } from '../../../../services/getOrdersHistory';
import OrdersHistoryIcon from '../../../../assets/history.svg'
import CheckGreenIcon from '../../../../assets/check-confirm-green.svg'
import ClockOrangeIcon from '../../../../assets/clock-orange-icon.svg'
import BackArrowIcon from '../../../../assets/back-arrow.svg' 
import OrderDetail from '../OrderDetail';
import './index.css'
import '../user-dashboard-panel-styles.css'

function OrdersHistory() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const {infoUser} = useContext(InfoUserContext)
    const {OrderDetailModal, showOrderDetail} = OrderDetail()

    useEffect(() =>{
        setLoading(true)
        getOrdersHistory({token:infoUser.token})
        .then(data => {
            setOrders(data)
            setLoading(false)
        })
    },[])

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      }
    
    return ( 
    <div className = "user-dashboard-panel-container">
        <NavBar/>
        {OrderDetailModal}
        <main className = "orders-history-panel">
            {loading?
            <div className = "loader-container"><Loader/></div>
            :
            <section className = "orders-history-list-container">
                <div className = "orders-history-title-container">
                    <img className = "back-arrow" alt = "back" src = {BackArrowIcon} onClick={() => window.history.back()}/>
                    <div>Historial de Pedidos</div>
                    <img alt = "orders-history" src = {OrdersHistoryIcon}/>
                </div>
                <ul className = "orders-history-list">
                    <li className = "orders-history-list-header">
                        <div>ID</div>
                        <div>Total</div>
                        <div className = "order-state">Estado</div>
                        <div className = "order-date">Fecha</div>
                    </li>
                    {orders.map(order => 
                        <section  key = {order.id} className = "li-order-container">
                            <li className = "order" onClick={() => showOrderDetail({orderId:order.id, orderInfo:order})}>
                                <div>{order.id}</div>
                                <div>{order.total} usd</div>
                                <div className = {order.finalizado?"order-state green":"order-state orange"}>
                                    <span>{order.finalizado?"Entregado":"En proceso"}</span>
                                    <img alt = "status-order" src = {order.finalizado?CheckGreenIcon:ClockOrangeIcon}/>
                                </div>
                                <div className = "order-date">{formatDate(order.created_at)}</div>
                            </li>
                            <button className = "btn" onClick={() => showOrderDetail({orderId:order.id, orderInfo: order})}>Ver mas</button>
                        </section>
                    )}
                </ul>
            </section>
            }
        </main>
    </div> );
}

export default OrdersHistory;