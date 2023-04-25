import React from "react";
import { BASE_URL } from "../../../settings";
import "./index.css";

export default function CategoriesCard({img, name}){
    return(
        <div className = "category-card">
            <img src = {`${BASE_URL}${img}`} alt = {name}/>
            <div className = "category-name">{name}</div>
        </div>
    )
}