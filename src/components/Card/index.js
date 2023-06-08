import React, {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import InfoUserContext from '../../context/InfoUserContext'
import {useManageCart} from '../../customHooks/useManageCart'
import {useShowFloatMessage} from '../../customHooks/useShowFloatMessage'
import { useHandleFavoriteProductsList } from '../../customHooks/userHandleFavoriteProductsList'
//icons import
import addToCartIcon from '../../assets/add-to-cart-icon.svg'
import inCartIcon from '../../assets/in-cart-icon.svg'
import ShowProductScore from '../ShowProductScore'
import EmptyHeartIcon from '../../assets/heart.svg'
import FullyHeartIcon from '../../assets/fully-heart.svg'
import './index.css'

export default function Card({id, product_name, precio, product_img1, puntuacion, favoriteProducts}){
  const {infoUser} = useContext(InfoUserContext)
  const navigate = useNavigate()
  const {productsCart, addProduct, checkProductInCart} = useManageCart()
  const [productAdded, setProductAdded] = useState(false)
  const [favorite, setFavorite] = useState(productInFavoriteList())
  const {showFloatMessage, FloatMessage} = useShowFloatMessage()
  const {addToFavoriteList, removeFromFavoriteList} = useHandleFavoriteProductsList({infoUser, showFloatMessage, setFavorite})

  //check if the product is already in the cart
  useEffect(() => {
      setProductAdded(checkProductInCart(id))
  }, [productsCart])

  //chek if the product is in the favorite list
  function productInFavoriteList(){
    if(favoriteProducts !== null){
      return favoriteProducts.indexOf(id) === -1?false:true
    }
  }

  function addToCart(){
    if(infoUser.token === null){
      showFloatMessage({message:"Debes iniciar session para usar el carro"})
    }
    else{
        addProduct({
          id:id,
          name:product_name,
          price:precio,
          cantidad:1})
    }
  }

  function handleClick(){
    navigate(`/detail/${id}/`)
  }

    return(
       <div className="ProductCard" id = {id} >
        {FloatMessage}
        <div className = 'img-container'>
            <img loading = "lazy" onClick={() => handleClick()} src={product_img1}  alt={product_name}/>
        </div>
        <div onClick={addToCart} className="add-to-cart-button ">
            {productAdded
            ?
            <img alt = "product-added" className = 'cart-product-added' src = {inCartIcon}/>
            :
            <>
              <img alt = "add-to-cart-icon" className = 'CartIcon' src = {addToCartIcon}/>
              Agregar al Carrito
            </>
            }
        </div>
        <div className = "name-and-price-container">
          <h5 className="product-card-name" onClick={() => handleClick()}>{product_name}</h5>
          <p className="card-text price" onClick={() => handleClick()}>{precio} usd</p>
        </div>
        <div className = "score-and-opinions-container">
          <ShowProductScore score = {puntuacion}/>
          {infoUser.token !== null?
            <div className = "add-product-to-favorite" onClick={() => {favorite?removeFromFavoriteList(id):addToFavoriteList(id)}}>
              <img alt = "favorite" src = {favorite?FullyHeartIcon:EmptyHeartIcon}/>
            </div>
            :null
          }
        </div>
       </div>

    )
}
