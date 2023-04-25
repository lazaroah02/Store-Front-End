import React from 'react';
import {BASE_URL} from '../../../settings'
import "./index.css"
import {Link} from "react-router-dom"

export default function ProductsRecomendedCards({product_img1, precio, id}){
    return(
        <div className = "product-recommended-card">
            <Link to = {`/detail/${id}`}>
                <img src = {`${BASE_URL}${product_img1}`} alt = "product-img"/>
            </Link>
                <div className = "product-recommended-price">${precio}</div>
        </div>
    )
}