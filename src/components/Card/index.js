import React, {useContext, useState} from 'react'
import './index.css'
import {useLocation} from 'wouter'
import {BASE_URL} from '../../settings'
import UserTokenContext from '../../context/UserTokenContext'
import {addProduct} from '../../customHooks/manageCart'
import addToCartIcon from '../../assets/add-to-cart-icon.svg'

export default function Card({id, product_name, precio, product_img1}){
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
          name:product_name,
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
          <img onClick={() => handleClick()} src={`${BASE_URL}${product_img1}`} className="card-img-top " alt={product_name}/>
        </div>
       <div className="body">
         <h5 className="card-title" onClick={() => handleClick()}>{product_name}</h5>
         <p className="card-text" onClick={() => handleClick()}>${precio}</p>
         <div onClick={addToCart} className="add-to-cart-button ">
            {productAdded
            ?
            <img alt = "product-added" className = 'cart-product-added' src = 'icons/cart-product-added.png'/>
            :
            <img alt = "add-to-cart-icon" className = 'CartIcon' src = {addToCartIcon}/>
            }
          </div>
       </div>
     </div>

    )
}
