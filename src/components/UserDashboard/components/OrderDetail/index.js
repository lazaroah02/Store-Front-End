import React, {useState, useContext} from 'react';
import {getOrderDetail} from'../../../../services/getOrderDetail';
import InfoUserContext from '../../../../context/InfoUserContext'
import {Modal, ModalBody, ModalHeader, ModalTitle} from 'react-bootstrap'
import Loader from '../../../Loader'
import OrderDetailCard from './OrderDetailCard'
import './index.css'
import '../user-dashboard-panel-styles.css'

export default function OrderDetail() {
    const [orderDetail, setOrderDetail]= useState(null)
    const [orderInfo, setOrderInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const {infoUser} = useContext(InfoUserContext)
    const [showModal, setShowModal] = useState(false)

    function handleGetOrderDetail({orderId}){
        setLoading(true)
        getOrderDetail({token:infoUser.token, orderId:orderId})
        .then(data => {
            setOrderDetail(data)
            setLoading(false)
        })
    }

    function showOrderDetail({orderId, orderInfo}){
        setOrderInfo(orderInfo)
        setShowModal(true)
        handleGetOrderDetail({orderId:orderId})
    }

    const OrderDetailModal = (
        <Modal dialogClassName = 'order-detail-modal-dialog' show = {showModal}>
            <ModalHeader>
                <ModalTitle>Orden: {orderInfo?orderInfo.id:null}</ModalTitle>
                <button className = "btn btn-danger" onClick={() => setShowModal(false)}>X</button>
            </ModalHeader>
            <ModalBody>
                {loading?
                    <div className = "loader-container">
                        <Loader/>
                    </div>
                    :
                    <div className = "order-detail-container">
                        {orderDetail?orderDetail.map(order => 
                            <OrderDetailCard key = {order.id} {...order}/>
                            ):null
                        }
                        <div className = "order-detail-total">Total: {orderInfo?orderInfo.total:null} usd</div>
                    </div>
                }
            </ModalBody>
        </Modal>
        )

    return {OrderDetailModal, showOrderDetail};
}
