import React, { useEffect, useState} from "react";
import { useManageCart} from "../../../customHooks/useManageCart";
import realizarPedido from '../../../services/realizarPedido'
import TrashCan from '../../../assets/trash.svg'
import "./index.css";

export default function BodyCart() {
  const [total, setTotal] = useState(0);
  const {productsCart, addProduct, restProduct, deleteProduct, cleanCart, calculateTotal} = useManageCart()

  useEffect(() => {
    setTotal(calculateTotal());
  },[productsCart]);


  function procesarPago() {
    if (productsCart.length > 0) {
      realizarPedido(productsCart)
    }
    else{
      alert("Tu carrito esta vacio!")
    }
  }

  return (
    <ul className = "ul-items-cart">
      {productsCart.map((product) => (
        <li className = "cart-product-row-container" key = {product.id}>
          <section className = "cart-product-row">
            <div className = "name-container"><p className = "name">{product.name.length > 10?`${product.name.substring(0, 10)}...`:product.name}</p></div>
            <div className = "cantidad-container">
                <button
                  className="restButton"
                  onClick={() => {
                    restProduct({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      cantidad: 1,
                    });
                  }}
                >-</button>
                <div className="cantidad">x{product.cantidad}</div>
                <button
                  className="addButton"
                  onClick={() => {
                    addProduct({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      cantidad: 1,
                    });
                  }}
                >+</button>
            </div>
            <div className = "sub-total">{product.subtotal} usd</div>
          </section>
          <img className = "trash-can" alt = "trash" src = {TrashCan} onClick={() => {deleteProduct(product)}}/>
        </li>
      ))}
      <div className = "total">Total: {total} usd</div>
      <section className = "buttons-pay-and-clean-cart-container">
          <button className="btn btn-clean-cart" onClick={() => cleanCart()}>
            Vaciar Carrito
          </button>
          <button className="btn btn-pay" onClick={() => procesarPago()}>
            Procesar Pago
          </button>
      </section>
    </ul>
  );
}
