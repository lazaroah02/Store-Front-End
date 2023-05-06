import React, {useContext, useState, useRef, useEffect} from 'react';
import './index.css';
import InfoUserContext from '../../context/InfoUserContext';
import {addProduct} from '../../customHooks/manageCart'
import {BASE_URL} from '../../settings'
import rightArrow from '../../assets/right-arrow-icon.svg'
import leftArrow from '../../assets/left-arrow-icon.svg'
import RateProduct from '../RateProduct'
import { checkIfUserCanRate } from '../../services/checkIfUserCanRate';

export default function ShowProductDetail(params){
    const {infoUser} = useContext(InfoUserContext)
    const [productAdded, setProductAdded] = useState(false)
    const [showRateProductComponent, setShowRateProductComponent] = useState(false)
    const [,add] = addProduct()

    //images references
    const refImg1 = useRef()
    const refImg2 = useRef()
    const refImg3 = useRef()

    //check if the user can rate the product and show the RateProductComponent
    useEffect(() => {
        if(infoUser.token !== null && params.id !== undefined){
            checkIfUserCanRate({productId:params.id, userToken:infoUser.token})
            .then(res => {
                if(res.status === 200){
                    setShowRateProductComponent(true)
                }
            })
        }
    },[])

    function addToCart(){
        if(infoUser.info === null){
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
    let contador = 0
    const images = [refImg1.current, refImg2.current, refImg3.current]
    function seeNextImage(){
        if(contador < 2){
            contador += 1
            images[contador].scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }
    //handle previous image
    function seePreviousImage(){
        if(contador > 0){
            contador -= 1
            images[contador].scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
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
            {showRateProductComponent?<RateProduct userToken={infoUser.token} productId = {params.id} userId={infoUser.info.id}/>:null}
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