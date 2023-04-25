import React from "react";
import { BASE_URL } from "../../../settings";
import './index.css'

export default function PromocionesCards({id,img, promotion}){
    return(
        <div className = "promotion-card">
            <div className = "promotion-content">{promotion}</div>
            <img src = {`${BASE_URL}${img}`} alt = {promotion}/>
        </div>
    )
}