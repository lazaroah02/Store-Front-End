import React, {useContext, useState} from 'react'
import './index.css'
import {useNavigate} from 'react-router-dom'
import InfoUserContext from '../../context/InfoUserContext'
import {addProduct} from '../../customHooks/manageCart'
import addToCartIcon from '../../assets/add-to-cart-icon.svg'
import inCartIcon from '../../assets/in-cart-icon.svg'
import ShowProductScore from '../ShowProductScore'

export default function Card({id, product_name, precio, product_img1, puntuacion}){
  const {infoUser} = useContext(InfoUserContext)
  const navigate = useNavigate()
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
    navigate(`/detail/${id}/`)
  }
    return(
       <div className="ProductCard" id = {id} >
        <div className = 'img-container'>
            <img loading = "lazy" onClick={() => handleClick()} src={product_img1}  alt={product_name}/>
        </div>
       <div className="product-card-body">
        <div className = "stars-and-button-cart-container">
          <ShowProductScore score = {puntuacion}/>
          <div onClick={addToCart} className="add-to-cart-button ">
              {productAdded
              ?
              <img alt = "product-added" className = 'cart-product-added' src = {inCartIcon}/>
              :
              <img alt = "add-to-cart-icon" className = 'CartIcon' src = {addToCartIcon}/>
              }
            </div>
        </div>
        <div className = "name-and-price-container">
          <h5 className="product-card-title" onClick={() => handleClick()}>{product_name}</h5>
          <p className="card-text" onClick={() => handleClick()}>${precio}</p>
        </div>
       </div>
     </div>

    )
}
