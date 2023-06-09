import React, {useState, useEffect} from 'react';
import { BASE_URL } from '../../../../../settings';
import AddToCartIcon from '../../../../../assets/add-to-cart-icon.svg'
import InCartIcon from '../../../../../assets/in-cart-icon.svg'
import { useManageCart } from '../../../../../customHooks/useManageCart';
import './index.css'

export default function OrderDetailCard(orderDetailInfo) {
    const [inCart, setInCart] = useState(false)
    const {productsCart, addProduct, checkProductInCart} = useManageCart()

    useEffect(() => {
        setInCart(checkProductInCart(orderDetailInfo.producto.id))
    },[productsCart])

    function handleAddProductToCart(){
        addProduct({
            id:orderDetailInfo.producto.id,
            name:orderDetailInfo.producto.product_name,
            price:orderDetailInfo.producto.precio,
            cantidad:orderDetailInfo.cantidad})
      }

    return ( 
        <div className = 'order-detail-card'>
            <div className = "order-detail-img">
                <img alt = "product-img" src = {`${BASE_URL}${orderDetailInfo.producto.product_img1}`}/>
            </div>
            <div className = "order-detail-product-name">
                {orderDetailInfo.producto.product_name}
            </div>
            <div className = "order-detail-product-price">
                Precio: {orderDetailInfo.producto.precio}
            </div>
            <div className = "order-detail-quantity">
                X{orderDetailInfo.cantidad}
            </div>
            <div className = "order-detail-subtotal">
                Subtotal: {orderDetailInfo.subtotal} usd
            </div>
            <div className = "order-detail-add-to-cart-button-container">
                <button className = "btn" onClick={() => handleAddProductToCart()}>
                    <img alt = "add-to-cart" src = {!inCart?AddToCartIcon:InCartIcon}/>
                </button>
            </div>
        </div> 
    );
}
