import React, {useContext, useState} from 'react'
import './index.css'
import {useLocation} from 'wouter'
import {BASE_URL} from '../../settings'
import InfoUserContext from '../../context/InfoUserContext'
import {addProduct} from '../../customHooks/manageCart'
import addToCartIcon from '../../assets/add-to-cart-icon.svg'
import inCartIcon from '../../assets/in-cart-icon.svg'

export default function Card({id, product_name, precio, product_img1}){
  const {infoUser} = useContext(InfoUserContext)
  const [, setLocation] = useLocation()
  const [,add] = addProduct()
  const [productAdded, setProductAdded] = useState(false)

  function addToCart(){
    if(infoUser === null){
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
        <div className = 'img-container'>
            <img loading = "lazy" onClick={() => handleClick()} src={`${BASE_URL}${product_img1}`}  alt={product_name}/>
        </div>
       <div className="body">
         <h5 className="card-title" onClick={() => handleClick()}>{product_name}</h5>
         <p className="card-text" onClick={() => handleClick()}>${precio}</p>
         <div onClick={addToCart} className="add-to-cart-button ">
            {productAdded
            ?
            <img alt = "product-added" className = 'cart-product-added' src = {inCartIcon}/>
            :
            <img alt = "add-to-cart-icon" className = 'CartIcon' src = {addToCartIcon}/>
            }
          </div>
       </div>
     </div>

    )
}
