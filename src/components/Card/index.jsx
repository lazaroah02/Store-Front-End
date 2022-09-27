import React from 'react'
import './index.css'

export default function Card({id, name, description, foto}){
    return(
       <div className = "ProductCard" onClick = {()=>console.log('Hola')}>
        <img alt ={"imagen"} src={`http://127.0.0.1:8000${foto}`}></img>
            <h3>{id}</h3>
            <p>{name}</p>
            <p>{description}</p>
       </div>
    )
}
