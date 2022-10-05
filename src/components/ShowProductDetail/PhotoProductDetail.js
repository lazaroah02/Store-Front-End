import React from 'react'
import './index.css'
import {BASE_URL} from '../../settings'

export default function PhotoProductDetail({foto}){
    return(
        <img 
        className = "PhotoProduct"
        src={`${BASE_URL}${foto}`} 
        alt = {"imagen"}
        />
    ) 
}