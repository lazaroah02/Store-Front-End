import React from 'react';
import "./index.css"
import {Link} from "react-router-dom"

export default function ProductsRecomendedCards({product_img1, precio, id}){
    return(
        <div className = "product-recommended-card">
            <Link to = {`/detail/${id}`}>
                <img src = {product_img1} alt = "product-img"/>
            </Link>
                <div className = "product-recommended-price">${precio}</div>
        </div>
    )
}