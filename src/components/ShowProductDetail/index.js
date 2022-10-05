import React, {useContext, useState} from 'react';
import './index.css';
import PhotoProductDetail from './PhotoProductDetail'
import InfoUserContext from '../../context/InfoUserContext'
import {addProduct} from '../../customHooks/manageCart'

export default function ShowProductDetail(params){
    const {token} = useContext(InfoUserContext)
    const [productAdded, setProductAdded] = useState(false)
    const [,add] = addProduct()

    function addToCart(){
        if(token == null){
          alert('Login to use the Cart')
        }
        else{
            if(productAdded === false){
                add({
                  id:params.id,
                  name:params.name,
                  price:params.precio,
                  cantidad:1})
                setProductAdded(true)
              }
        }
      }
    return(
        <div>
            <section className = "PhotosDetailContainer ">
                {params.fotos.map(foto => <PhotoProductDetail foto = {foto}/>)}
            </section>
                <h3 className = 'points-container'>. . .</h3>
            <p className = "ProductPrice">
                <h3>${params.precio}</h3>
                <button onClick={() => addToCart()} class = "btn btn-primary">{productAdded?'In Cart':'Add to cart'}</button>
                </p>
            <p className = "ProductName container">
                <h3>{params.name}</h3>
                <br/>
                <h5>Description:</h5>
                {params.description}
                <br/>
                <br/>
                <h5>About the product:</h5>
                {params.about}
            </p>
        </div>
    )
}