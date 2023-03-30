import React, {useContext, useState, useRef} from 'react';
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

    //images references
    const refImg1 = useRef()
    const refImg2 = useRef()
    const refImg3 = useRef()

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
        let images = [refImg1.current, refImg2.current, refImg3.current]
        if(contador < 2 && contador >= -1){
            if(contador === -1){
                contador += 2
            }else{
                contador += 1
            }
            images[contador].scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }
    //handle previous image
    function seePreviousImage(){
        let images = [refImg1.current, refImg2.current, refImg3.current]
        if(contador <= 3 && contador > 0){
            contador -= 1
        }  
        images[contador].scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
    }
    return(
        <div>
            <section className = "PhotosDetailContainer ">
                <img 
                    key = {0}
                    ref = {refImg1}
                    className = "PhotoProduct"
                    src={`${BASE_URL}${params.product_img1}`} 
                    alt = {params.name}
                    />
                <img 
                    key = {1}
                    ref = {refImg2}
                    className = "PhotoProduct"
                    src={`${BASE_URL}${params.product_img2}`} 
                    alt = {params.name}
                    />
                <img 
                    key = {2}
                    ref = {refImg3}
                    className = "PhotoProduct"
                    src={`${BASE_URL}${params.product_img3}`} 
                    alt = {params.name}
                    />
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
                <h3>{params.product_name}</h3>
                <br/>
                <h5>Description:</h5>
                {params.product_description}
                <br/>
                <br/>
                <h5>About the product:</h5>
                {params.about}
            </div>
        </div>
    )
}