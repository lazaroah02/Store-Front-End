import React from "react";
import {useMyNavigate} from '../../../../customHooks/useMyNavigate'
import "./index.css";

export default function ListOfProducts({products, showSelectButtons, addProductsToDelete}){
  const myNavigate = useMyNavigate()

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  return (
      <ul className="products-seller-list">
        <li className = "header-list">
          <div>Producto</div>
          <div>Cantidad</div>
          <div>Precio</div>
          <div>Fecha</div>
        </li>
          {products.length === 0 || products === undefined || products === null
            ? <li><strong className = "not-found-message">No hay productos</strong></li>
            : 
              <>
                {products.map((product) => 
                  <li key = {product.id}>
                    <input 
                    type = "checkbox" 
                      className = {showSelectButtons?"select-product-visible":"select-product-invisible"}
                      onChange={() => {addProductsToDelete(product.id)}}
                      />
                    <div onClick = {() => myNavigate(`/user/seller/product/${product.id}`)}>{product.product_name}</div>
                    <div onClick = {() => myNavigate(`/user/seller/product/${product.id}`)}>{product.in_stock}</div>
                    <div onClick = {() => myNavigate(`/user/seller/product/${product.id}`)}>{product.precio} usd</div>
                    <div onClick = {() => myNavigate(`/user/seller/product/${product.id}`)}>{formatDate(product.created_at)}</div>
                  </li>
                )}
              </>
            }
      </ul>
  );
}
