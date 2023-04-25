import React from "react";
import { BASE_URL } from "../../../settings";
import "./index.css"

export default function PromocionesEspecialesCard({id, img, promotion}){
    return (
        <div className = "special-promotion-card">
            <img alt = {promotion} src = {`${BASE_URL}${img}`}/>
        </div>
    )
}