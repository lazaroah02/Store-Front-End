import React, {useContext, useState} from 'react'
import './index.css'
import {useLocation} from 'wouter'
import {BASE_URL} from '../../settings'
import UserTokenContext from '../../context/UserTokenContext'
import {addProduct} from '../../customHooks/manageCart'

export default function Card({id, name, precio, foto}){
  const {token} = useContext(UserTokenContext)
  const [, setLocation] = useLocation()
  const [,add] = addProduct()
  const [productAdded, setProductAdded] = useState(false)

  function addToCart(){
    if(token === null || token === undefined){
      alert('Login to use the Cart')
    }
    else{
        add({
          id:id,
          name:name,
          price:precio,
          cantidad:1})
        setProductAdded(true)
    }
  }

  function handleClick(){
    setLocation(`/detail/${id}/`)
  }
    return(
      
       <div className="ProductCard" id = {id} >
        <div className = 'image-container'>
          <img onClick={() => handleClick()} src={`${BASE_URL}${foto}`} className="card-img-top " alt={"imagen"}/>
        </div>
       <div className="body">
         <h5 className="card-title" onClick={() => handleClick()}>{name}</h5>
         <p className="card-text" onClick={() => handleClick()}>${precio}</p>
         <div onClick={addToCart} className="add-to-cart-button ">{productAdded?<img className = 'cart-product-added' src = 'icons/cart-product-added.png'></img>:<img className = 'CartIcon' src = 'icons/add-to-cart-logo.png'></img>}</div>
       </div>
     </div>

    )
}
