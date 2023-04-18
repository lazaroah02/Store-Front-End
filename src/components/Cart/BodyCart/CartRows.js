import React, { useEffect, useState, useContext } from "react";
import { addProduct } from "../../../customHooks/manageCart";
import { deleteProduct } from "../../../customHooks/manageCart";
import ProductsCartContext from "../../../context/ProductsCartContext";
import realizarPedido from '../../../services/realizarPedido'
import "./index.css";

export default function CartRows() {
  const { productsCart, setProductCart} = useContext(ProductsCartContext);
  const [state, setState] = useState([]);
  const [sumaTotal, setSumaTotal] = useState(0);
  const [, add] = addProduct();
  const [, rest] = deleteProduct();
  const [timesStateChanged, setStateChange] = useState(0);

  useEffect(() => {
    setSumaTotal(calulateSumaTotal(productsCart));
    setState(productsCart);
  });

  function calulateSumaTotal(products) {
    let contSumTotal = 0;
    products.map((element) => 
      contSumTotal += element.subtotal
    );
    return contSumTotal;
  }

  function procesarPago() {
    if (productsCart.length > 0) {
      realizarPedido(productsCart)
    }
    else{
      alert("Your cart is empty!");
    }
  }
  function vaciarCarrito(){
    if(productsCart.length > 0){
      setProductCart([])
      window.location.reload()
    }
  }
  return (
    <>
      {state.map((element) => (
        <tr key = {element.id}>
          <td>{element.name}</td>
          <td>${element.price}</td>
          <td className = "td-cantidad">
            <div className="CantidadContainer">{element.cantidad}</div>
            <div className = "buttons-add-rest-container">
              <button
                className="btn btn-primary restButton"
                onClick={() => {
                  rest({
                    id: element.id,
                    name: element.name,
                    price: element.price,
                    cantidad: 1,
                  });
                  setStateChange(timesStateChanged + 1);
                }}
              >-</button>
              <button
                className="btn btn-primary addButton"
                onClick={() => {
                  add({
                    id: element.id,
                    name: element.name,
                    price: element.price,
                    cantidad: 1,
                  });
                  setStateChange(timesStateChanged + 1);
                }}
              >+</button>
            </div>
          </td>

          <td>${element.subtotal}</td>
        </tr>
      ))}
      <tr>
        <th colSpan="4" className="Total">
          Total:${sumaTotal}
        </th>
      </tr>
      <tr>
        <td colSpan="2" className="tableFooter">
          <button className="btn btn-primary" onClick={() => procesarPago()}>
            Procesar Pago
          </button>
        </td>
        <td colSpan="2" className="tableFooter">
          <button className="btn btn-primary" onClick={() => vaciarCarrito()}>
            Vaciar Carrito
          </button>
        </td>
      </tr>
    </>
  );
}
