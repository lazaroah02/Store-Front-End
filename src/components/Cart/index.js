import React, {useEffect, useState, useContext} from 'react';
import Modal from 'react-bootstrap/Modal'
import CartContent from './BodyCart/CartContent'
import ProductsCartContext from '../../context/ProductsCartContext'
import './index.css'

export default function Cart(){
    const [showModal, setShowModal] = useState(false)
    const [contadorItemsCart, setContador] = useState(0)
    const {productsCart} = useContext(ProductsCartContext)
    
    useEffect(() => {
        setContador(productsCart.length)
    },)
    return(
        <div className = 'logoCart'>
            <div className = 'A' onClick = {() => setShowModal(true)}></div>
            {contadorItemsCart > 0 ?<div className = 'contador-cart'>{contadorItemsCart}</div>:null}
            <Modal show = {showModal}>
            <Modal.Header>
                <Modal.Title>
                    Cart
                </Modal.Title>
                <button className = "CloseModalButton btn btn-danger" onClick={() => setShowModal(false)}>X</button>
            </Modal.Header>
            <Modal.Body>
                 <CartContent />
            </Modal.Body>
        </Modal>
        </div>
    )
}