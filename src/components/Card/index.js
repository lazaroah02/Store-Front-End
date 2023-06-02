import React, {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import InfoUserContext from '../../context/InfoUserContext'
import {useManageCart} from '../../customHooks/useManageCart'
import addToCartIcon from '../../assets/add-to-cart-icon.svg'
import inCartIcon from '../../assets/in-cart-icon.svg'
import ShowProductScore from '../ShowProductScore'
import ShowFloatMessage from '../ShowFloatMessage'
import HeartIcon from '../../assets/heart.svg'
import './index.css'

export default function Card({id, product_name, precio, product_img1, puntuacion, cantidad_puntuaciones}){
  const {infoUser} = useContext(InfoUserContext)
  const navigate = useNavigate()
  const {productsCart, addProduct, checkProductInCart} = useManageCart()
  const [productAdded, setProductAdded] = useState(false)

  //show float message states
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState({title: "", message: "", type: "success"})

  //check if the product is already in the cart
  useEffect(() => {
      setProductAdded(checkProductInCart(id))
  }, [productsCart])

  function addToCart(){
    if(infoUser.token === null){
      setMessage({title:"!", message:"Debes iniciar session para usar el carro", type:"angry"})
      setShowMessage(true)
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
        <ShowFloatMessage 
          show={showMessage} 
          setShow={setShowMessage} 
          message = {message.message} 
          title = {message.title} 
          type = {message.type}
          />
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
          <div className = "add-product-to-favorite">
            <img alt = "favorite" src = {HeartIcon}/>
          </div>
        </div>
       </div>

    )
}
