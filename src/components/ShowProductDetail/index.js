import React, {useContext, useState, useRef, useEffect} from 'react';
import './index.css';
import InfoUserContext from '../../context/InfoUserContext';
import {addProduct} from '../../customHooks/manageCart'
import {BASE_URL} from '../../settings'
import RateProduct from '../RateProduct'
import { checkIfUserCanRate } from '../../services/checkIfUserCanRate';
import ShowProductScore from '../ShowProductScore'

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

    function handleFocusImage(ref){
        console.log("center")
        ref.current.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
    }
    return(
        <div className = "detail-product-container">
            <section className = "photos-detail-container">
                <div className = "photos-detail-scroll">
                    <img 
                        ref = {refImg1}
                        className = "PhotoProduct"
                        src={`${BASE_URL}${params.product_img1}`} 
                        alt = {params.name}
                        />
                    <img 
                        ref = {refImg2}
                        className = "PhotoProduct"
                        src={`${BASE_URL}${params.product_img2}`} 
                        alt = {params.name}
                        />
                    <img 
                        ref = {refImg3}
                        className = "PhotoProduct"
                        src={`${BASE_URL}${params.product_img3}`} 
                        alt = {params.name}
                        />
                </div>
                <div className = "images-navigator">
                    <img 
                        onClick={() => handleFocusImage(refImg1)}
                        src={`${BASE_URL}${params.product_img1}`} 
                        alt = "navigator"
                        />
                    <img 
                        onClick={() => handleFocusImage(refImg2)}
                        src={`${BASE_URL}${params.product_img2}`} 
                        alt = "navigator"
                        />
                    <img 
                        onClick={() => handleFocusImage(refImg3)}
                        src={`${BASE_URL}${params.product_img3}`} 
                        alt = "navigator"
                        />
                </div>
            </section>
            <div className = "info-product-container">
                <header className = "product-name-container">
                    <h3>{params.product_name}</h3>
                    <hr className = "info-product-separator"/>
                </header>
                <section className = "product-score-container">
                    <ShowProductScore score = {params.puntuacion}/>
                    <div>
                        {params.puntuacion}/5 ({params.cantidad_puntuaciones} opiniones)
                    </div>
                </section>
                <div className = "div-separator"></div>
                <section className = "product-price-detail-container">
                    <div className = "price-detail">{params.precio-params.descuento} usd</div>
                    <div className = "discount-container">
                        <div className = "old-price">
                            {params.precio}
                            <hr/>   
                        </div>
                        <div className = "discount-percent">{Math.round((params.descuento/params.precio)*100)}% OFF</div>
                    </div>
                </section>
                <div className = "div-separator"></div>
                <section className = "description-container">
                    {params.product_description}
                    <p>
                        {params.about}
                    </p>
                </section>
                <div className = "div-separator"></div>
                <hr className = "info-product-separator"/>
                <div className = "add-to-cart-button-and-rate-product-container">
                    <div>
                        <button onClick={() => addToCart()} className = "btn btn-add-to-cart">{productAdded?'Producto añadido':'Añadir al carrito'}</button>
                    </div>
                    <div className = "rate-product-detail-container">
                        {showRateProductComponent?<RateProduct userToken={infoUser.token} productId = {params.id} userId={infoUser.info.id}/>:null}
                    </div>
                </div>
             </div> 
        </div>
    )
}