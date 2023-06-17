import React from 'react';
import {useManageCart} from '../../../customHooks/useManageCart'
import TrashCanIcon from '../../../assets/trash.svg'
import './index.css'
import '../process-pay-panel.css'

function PurchaseSummary() {
    const {productsCart, deleteProduct, calculateTotal} = useManageCart();

    return ( 
        <div className = "process-pay-panel">
            {productsCart.length > 0?
            <>
                <ul className = "purchase-summary-products-list">
                    {productsCart.map(product => 
                        <li key = {product.id}>
                            <section>
                                <button className = "btn btn-quit-product-of-order" onClick = {() => deleteProduct(product)}>
                                    <img alt= "trash" src = {TrashCanIcon}/>
                                </button>
                            </section>
                            <div className = "purchase-summary-product-name">{product.name}</div>
                            <div>{product.price} usd</div>
                            <div className = "purchase-summary-cantidad">{product.cantidad}</div>
                            <div>{product.subtotal} usd</div>
                        </li>
                    )}
                </ul>
                <div className = "purchase-summary-separator"/>
                <div className = "purchase-summary-total-container">
                    <strong>Total a pagar:</strong>
                    <strong>{calculateTotal()} usd</strong>
                </div>
            </>
            :
            <div className = "empty-cart-message">Tu carrito esta vacio</div>
            }
        </div>
     );
}

export default PurchaseSummary;