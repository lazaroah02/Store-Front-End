import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import CartContent from './BodyCart/CartContent'
import CartIcon from '../../assets/navBarIcons/cart-icon.svg'
import './index.css'

export default function Cart(){
    const [showModal, setShowModal] = useState(false)
    
    return(
        <>
            <div className = "cart" onClick = {() => setShowModal(true)}>
                <img alt = "cart" src = {CartIcon}></img>
                <div className = "cart-text">Carro</div>
            </div>
            <Modal show = {showModal}>
            <Modal.Header>
                <Modal.Title>
                    Cart
                </Modal.Title>
                <button className = "btn btn-danger" onClick={() => setShowModal(false)}>X</button>
            </Modal.Header>
            <Modal.Body>
                <div className = "table-container">
                    <CartContent />
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}