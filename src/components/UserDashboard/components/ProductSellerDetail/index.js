import React, {useContext, useState, useEffect, Suspense, useRef} from 'react';
import './index.css';
import getProductOfSellerDetail from '../../../../services/getProductOfSellerDetail'
import {BASE_URL} from '../../../../settings'
import ShowEditProductModalContext from '../../context/showEditProductModalContext'
import UpdateProductDetailContext from '../../context/updateProductDetail'
import NavBar from "../../../NavBar"
import OptionsNavBar from '../OptionsNavBar'
import InfoUserContext from '../../../../context/InfoUserContext'

//icons import
import RightArrow from '../../../../assets/right-arrow-icon.svg'
import LeftArrow from '../../../../assets/left-arrow-icon.svg'


export default function ShowProductDetail({params}){
    const EditProductModal = React.lazy(() => import('../EditProductModal')) 
    const [infoProduct, setInfoProduct] = useState({})
    const {updateProductDetail} = useContext(UpdateProductDetailContext)
    const {setShowEditProductModal} = useContext(ShowEditProductModalContext)
    const {keyword} = params

    //images references
    const refImg1 = useRef()
    const refImg2 = useRef()
    const refImg3 = useRef()

    const {infoUser} = useContext(InfoUserContext)
  
    useEffect(() => {
        getProductOfSellerDetail(keyword)
        .then((data )=> setInfoProduct(data))                
    },[updateProductDetail])

    let contador = -1
    //handle see the next image 
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
    //handle see the previous image
    function seePreviousImage(){
        let images = [refImg1.current, refImg2.current, refImg3.current]
        if(contador <= 3 && contador > 0){
            contador -= 1
            images[contador].scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }

    return(
        <div className = 'div-container-product-detail'>
            <NavBar/>
            <OptionsNavBar is_seller = {infoUser.is_seller}/>
            <Suspense>
                <EditProductModal {...infoProduct}/>
            </Suspense>

            <div className = "PhotosDetailContainer ">
                <img 
                    key = {0}
                    ref = {refImg1}
                    className = "PhotoProduct"
                    src={`${BASE_URL}${infoProduct.product_img1}`} 
                    alt = {infoProduct.product_name}
                    />  
                <img 
                    key = {1}
                    ref = {refImg2}
                    className = "PhotoProduct"
                    src={`${BASE_URL}${infoProduct.product_img2}`} 
                    alt = {infoProduct.product_name}
                    />  
                <img 
                    key = {2}
                    ref = {refImg3}
                    className = "PhotoProduct"
                    src={`${BASE_URL}${infoProduct.product_img3}`} 
                    alt = {infoProduct.product_name}
                    />  
            </div>

             <div>
                <button className = "boton-next-image btn" onClick={() => seeNextImage()}>
                    <img alt = "right-arrow" src = {RightArrow}/>
                </button>
                <button  className = "boton-previous-image btn" onClick={() => seePreviousImage()}>
                    <img alt = "left-arrow" src = {LeftArrow}/>    
                </button> 
             </div>       
            
            <div className = 'edit-button-container'>
                <button className = 'btn btn-primary' onClick = {() => setShowEditProductModal(true)}>Edit</button>
            </div>
            
            <div className = "ProductPrice">
                <h3>${infoProduct === undefined?null:infoProduct.precio}</h3>
            </div>

            <div className = "ProductName container">
                <h3>{infoProduct === undefined?null:infoProduct.product_name}</h3>
                <br/>
                <h5>Description:</h5>
                {infoProduct === undefined?null:infoProduct.product_description}
                <br/>
                <br/>
                <h5>About the product:</h5>
                {infoProduct === undefined?null:infoProduct.about}
            </div>
    
    </div>
    )
}