import React from "react";
import { BASE_URL } from "../../../settings";
import "./index.css";
import {useNavigate} from 'react-router-dom'

export default function CategoriesCard({id, img, name}){
    const navigate = useNavigate()
    return(
        <div className = "category-card" onClick = {() => navigate(`/products/categoria=${id}`)}>
            <img src = {`${BASE_URL}${img}`} alt = {name}/>
            <div className = "category-name">{name}</div>
        </div>
    )
}