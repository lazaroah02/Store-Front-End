import React, {useContext, useState, useEffect, Suspense} from 'react';
import './index.css';
import ProductOfSellerDetail from '../../context/productOfSellerDetail'
import getProductDetail from '../../../../services/getProductDetail'
import {BASE_URL} from '../../../../settings'
import ShowEditProductModalContext from '../../context/showEditProductModalContext'
import UpdateProductDetailContext from '../../context/updateProductDetail'

export default function ShowProductDetail(){
    
    const EditProductModal = React.lazy(() => import('../EditProductModal')) 

    const {actualProduct, setActualProduct} = useContext(ProductOfSellerDetail)
    const [infoProduct, setInfoProduct] = useState(undefined)
    const {updateProductDetail} = useContext(UpdateProductDetailContext)

    const {setShowEditProductModal} = useContext(ShowEditProductModalContext)

    useEffect(() => {
        if(actualProduct != undefined){
            getProductDetail(actualProduct.id)
            .then(data => setInfoProduct(data[0]))
        }
    },[actualProduct, updateProductDetail])

    let contador = -1
    //handle see the next image 
    function seeNextImage(){
        if(contador < 2 && contador >= -1){
            if(contador === -1){
                contador += 2
            }else{
                contador += 1
            }
            let img = document.getElementById(infoProduct.fotos[contador])
            img.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }
    //handle see the previous image
    function seePreviousImage(){
        if(contador <= 3 && contador > 0){
            contador -= 1
            let img = document.getElementById(infoProduct.fotos[contador])
            img.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }

    return(
        <div className = 'div-container-product-detail'>
            <Suspense>
                <EditProductModal {...infoProduct}/>
            </Suspense>

            <div className = "PhotosDetailContainer ">
                {infoProduct === undefined?null:infoProduct.fotos.map(foto => <img 
                    key = {foto}
                    id = {foto}
                    className = "PhotoProduct"
                    src={`${BASE_URL}${foto}`} 
                    alt = {"imagen"}
                    />)}   
            </div>

             <div>
                <button className = "boton-next-image btn" onClick={() => seeNextImage()}>
                    <img src = 'icons/right-arrow-alt-regular-24.png'/>
                </button>
                <button  className = "boton-previous-image btn" onClick={() => seePreviousImage()}>
                    <img src = 'icons/left-arrow-alt-regular-24.png'/>    
                </button> 
             </div>       
            
            <div className = 'edit-button-container'>
                <button className = 'btn btn-primary' onClick = {() => setShowEditProductModal(true)}>Edit</button>
            </div>
            
            <div className = "ProductPrice">
                <h3>${infoProduct === undefined?null:infoProduct.precio}</h3>
            </div>

            <div className = "ProductName container">
                <h3>{infoProduct === undefined?null:infoProduct.name}</h3>
                <br/>
                <h5>Description:</h5>
                {infoProduct === undefined?null:infoProduct.description}
                <br/>
                <br/>
                <h5>About the product:</h5>
                {infoProduct === undefined?null:infoProduct.about}
            </div>
    
    </div>
    )
}