import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import CartContent from './BodyCart/CartContent'
import './index.css'
import CartIcon from '../../assets/navBarIcons/cart-icon.svg'

export default function Cart(){
    const [showModal, setShowModal] = useState(false)
    
    return(
        <div className = 'logoCart'>
            <div onClick = {() => setShowModal(true)}><img alt = "cart" src = {CartIcon}></img></div>
            <Modal show = {showModal}>
            <Modal.Header>
                <Modal.Title>
                    Cart
                </Modal.Title>
                <button className = "btn btn-danger" onClick={() => setShowModal(false)}>X</button>
            </Modal.Header>
            <Modal.Body>
                 <CartContent />
            </Modal.Body>
        </Modal>
        </div>
    )
}