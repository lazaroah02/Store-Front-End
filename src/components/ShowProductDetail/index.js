import React, {useContext, useState} from 'react';
import './index.css';
import UserTokenContext from '../../context/UserTokenContext'
import {addProduct} from '../../customHooks/manageCart'
import {BASE_URL} from '../../settings'
import rightArrow from '../../assets/right-arrow-alt-regular-24.png'
import leftArrow from '../../assets/left-arrow-alt-regular-24.png'

export default function ShowProductDetail(params){
    const {token} = useContext(UserTokenContext)
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

    //handle next image   
    let contador = -1
    function seeNextImage(){
        if(contador < 2 && contador >= -1){
            if(contador === -1){
                contador += 2
            }else{
                contador += 1
            }
            let img = document.getElementById(params.fotos[contador])
            img.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }
    //handle previous image
    function seePreviousImage(){
        if(contador <= 3 && contador > 0){
            contador -= 1
            let img = document.getElementById(params.fotos[contador])
            img.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }
    return(
        <div>
            <section className = "PhotosDetailContainer ">
                {params.fotos.map(foto => <img 
                    key = {foto}
                    className = "PhotoProduct"
                    id = {foto}
                    src={`${BASE_URL}${foto}`} 
                    alt = {params.name}
                    />)}
            </section>

            <div>
                <button className = "boton-next-image2 btn" onClick={() => seeNextImage()}>
                    <img alt = "right-arrow" src = {rightArrow}/>
                </button>
                <button  className = "boton-previous-image2 btn" onClick={() => seePreviousImage()}>
                    <img alt = "left-arrow" src = {leftArrow}/>  
                </button> 
             </div> 

            <div className = "ProductPrice">
                <h3>${params.precio}</h3>
                <button onClick={() => addToCart()} className = "btn btn-primary">{productAdded?'In Cart':'Add to cart'}</button>
                </div>
            <div className = "ProductName container">
                <h3>{params.name}</h3>
                <br/>
                <h5>Description:</h5>
                {params.description}
                <br/>
                <br/>
                <h5>About the product:</h5>
                {params.about}
            </div>
        </div>
    )
}