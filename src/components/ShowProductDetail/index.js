import React, {useContext, useState, useRef, useEffect} from 'react';
import InfoUserContext from '../../context/InfoUserContext';
import {useManageCart} from '../../customHooks/useManageCart'
import {BASE_URL} from '../../settings'
import RateProduct from '../RateProduct'
import {debounce} from '../../helpFunctions/debounce'
import { useNavigateItems } from '../../customHooks/useNavigateItems';
import { checkIfUserCanRate } from '../../services/checkIfUserCanRate';
import ShowProductScore from '../ShowProductScore'
import './index.css';

export default function ShowProductDetail(params){
    const {infoUser} = useContext(InfoUserContext)
    const [productAdded, setProductAdded] = useState(false)
    const [showRateProductComponent, setShowRateProductComponent] = useState(false)
    const scrollRef = useRef()
    const {contador, updateCont} = useNavigateItems(scrollRef,false)
    const {productsCart, addProduct, checkProductInCart} = useManageCart()
    
    //images references

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

    //check if product is in cart
    useEffect(() => {
        if(params.id !== undefined){
            setProductAdded(checkProductInCart(params.id))
        }
    }, [productsCart])

    function addToCart(){
        if(infoUser.info === null){
          alert('Login to use the Cart')
        }
        else{
            if(productAdded === false){
                addProduct({
                  id:params.id,
                  name:params.name,
                  price:params.precio,
                  cantidad:1})
                setProductAdded(true)
              }
        }
      }

    function updateContbyScroll(){
        if(scrollRef.current !== undefined && scrollRef.current !== null){
            return updateCont(Math.round(scrollRef.current.scrollLeft/scrollRef.current.offsetWidth))
        }
    }  

    const focusImageByScroll = debounce(() => updateContbyScroll(), 50)

    return(
        <div className = "detail-product-container">
            <section className = "photos-detail-container">
                <div className = "photos-detail-scroll" ref = {scrollRef} onScroll={() => focusImageByScroll()}>
                    <img 
                        className = "PhotoProduct"
                        src={`${BASE_URL}${params.product_img1}`} 
                        alt = {params.name}
                        />
                    <img 
                        className = "PhotoProduct"
                        src={`${BASE_URL}${params.product_img2}`} 
                        alt = {params.name}
                        />
                    <img 
                        className = "PhotoProduct"
                        src={`${BASE_URL}${params.product_img3}`} 
                        alt = {params.name}
                        />
                </div>
                <div className = "images-navigator">
                    <div className = {contador === 0?"active":null} onClick={() => updateCont(0)}></div>
                    <div className = {contador === 1?"active":null} onClick={() => updateCont(1)}></div>
                    <div className = {contador === 2?"active":null} onClick={() => updateCont(2)}></div>
                </div>
            </section>
            <div className = "info-product-container">
                <header className = "product-name-container">
                    <h3>{params.product_name}</h3>
                </header>
                <hr className = "info-product-separator-dark"/>
                <section className = "product-score-container">
                    <ShowProductScore score = {params.puntuacion}/>
                    <div>
                        {params.puntuacion}/5 ({params.cantidad_puntuaciones} opiniones)
                    </div>
                </section>
                <div className = "div-separator"></div>
                <section className = "product-price-detail-container">
                    <div className = "price-detail">{params.precio-params.descuento} usd</div>
                    {params.descuento > 0?
                        <div className = "discount-container">
                            <div className = "old-price">
                                {params.precio} usd
                                <hr/>   
                            </div>
                            <div className = "discount-percent">{Math.round((params.descuento/params.precio)*100)}% OFF</div>
                        </div>
                        :null
                    }
                </section>
                <div className = "div-separator"></div>
                <section className = "description-container">
                    {params.product_description}
                    <p>
                        {params.about}
                    </p>
                </section>
                <div className = "div-separator"></div>
                <hr className = "info-product-separator-soft"/>
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