import React, {useContext, useState} from 'react'
import './index.css'
import {useLocation} from 'wouter'
import {BASE_URL} from '../../settings'
import InfoUserContext from '../../context/InfoUserContext'
import {addProduct} from '../../customHooks/manageCart'

export default function Card({id, name, precio, foto}){
  const {token} = useContext(InfoUserContext)
  const [, setLocation] = useLocation()
  const [,add] = addProduct()
  const [productAdded, setProductAdded] = useState(false)

  function addToCart(){
    if(token === null){
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
       <div className="ProductCard card "  >
       <img onClick={() => handleClick()} src={`${BASE_URL}${foto}`} className="card-img-top " alt={"imagen"}/>
       <div className="card-body" onClick={() => handleClick()}>
         <h5 className="card-title">{name}</h5>
         <p className="card-text">${precio}</p>
       </div>
       <div className = 'card-footer CardFooter'>
        <button onClick={addToCart} className="btn btn-primary">{productAdded?'In Cart':'Add to cart'}</button>
       </div>
     </div>
    )
}
