import React, { useEffect, useState} from "react";
import { useManageCart} from "../../../customHooks/useManageCart";
import realizarPedido from '../../../services/realizarPedido'
import TrashCan from '../../../assets/trash.svg'
import "./index.css";

export default function BodyCart() {
  const [total, setTotal] = useState(0);
  const {productsCart, addProduct, restProduct, deleteProduct, cleanCart, calculateTotal} = useManageCart()
  const [timesStateChanged, setStateChange] = useState(0);

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
    <>
      {productsCart.map((product) => (
        <tr className = "cart-product-row" key = {product.id}>
          <td>{product.name}</td>
          <td className = "td-cantidad">
              <button
                className="restButton"
                onClick={() => {
                  restProduct({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    cantidad: 1,
                  });
                  setStateChange(timesStateChanged + 1);
                }}
              >-</button>
              <div className="CantidadContainer">x{product.cantidad}</div>
              <button
                className="addButton"
                onClick={() => {
                  addProduct({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    cantidad: 1,
                  });
                  setStateChange(timesStateChanged + 1);
                }}
              >+</button>
          </td>
          <td>${product.subtotal}</td>
          <td><img alt = "trash" src = {TrashCan} onClick={() => {deleteProduct(product)}}/></td>
        </tr>
      ))}
      <tr>
        <td colSpan="2" className="tableFooter">
          <button className="btn btn-primary" onClick={() => procesarPago()}>
            Pagar Total {total} usd
          </button>
        </td>
        <td colSpan="2" className="tableFooter">
          <button className="btn btn-primary" onClick={() => cleanCart()}>
            Vaciar Carrito
          </button>
        </td>
      </tr>
    </>
  );
}
