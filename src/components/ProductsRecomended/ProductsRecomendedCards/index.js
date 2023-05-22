import React from 'react';
import "./index.css"
import {useMyNavigate} from "../../../customHooks/useMyNavigate"

export default function ProductsRecomendedCards({product_img1, product_name, precio, id}){
    const myNavigate = useMyNavigate()
    return(
        <div className = "product-recommended-card" onClick={() => myNavigate(`/detail/${id}`)}>
                <img src = {product_img1} alt = "product-img"/>
                <section className = "">
                    <div className = "product-recommended-name">{product_name}</div>
                    <div className = "product-recommended-price">${precio}</div>
                </section>
        </div>
    )
}