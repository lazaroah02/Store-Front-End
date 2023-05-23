import React, {useState, useContext, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import BodyCart from './BodyCart'
import CartIcon from '../../assets/navBarIcons/cart-icon.svg'
import ProductsCartContext from "../../context/ProductsCartContext";
import './index.css'

export default function Cart(){
    const [showModal, setShowModal] = useState(false)
    const {productsCart} = useContext(ProductsCartContext)
    const [contItemsCart, setContItemsCart] = useState(0)

    useEffect(() => {
        setContItemsCart(productsCart.length)
    },[productsCart])
    
    return(
        <>
            <div className = "cart-container">  
                <div className = "cart" onClick = {() => setShowModal(true)}>
                    <img alt = "cart" src = {CartIcon}></img>
                    <div className = "cart-text">Carro</div>
                </div>
                {contItemsCart > 0?<div className = "contador-items-cart">{contItemsCart}</div>:null}
            </div>
            <Modal show = {showModal}>
            <Modal.Header>
                <Modal.Title>
                    Carrito de Compra
                </Modal.Title>
                <button className = "btn close-modal-button" onClick={() => setShowModal(false)}>X</button>
            </Modal.Header>
            <Modal.Body>
                <section className = "body-cart-container">
                    <BodyCart/>
                </section>
            </Modal.Body>
        </Modal>
        </>
    )
}