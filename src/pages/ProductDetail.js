import React, {useEffect, useState} from 'react'
import getProductDetail from '../services/getProductDetail'
import ShowProductDetail from '../components/ShowProductDetail'
import ProductsRecomended from '../components/ProductsRecomended'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ProgresGif from '../components/ProgresGif'
import {useParams} from 'react-router-dom'
import './pagesStyles/showProductDetail.css'

export default function ProductDetail() {
    const {keyword} = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(function(){
        getProductDetail(keyword).then(data => {
            setProduct(data)
            setLoading(false)
        })
    },[keyword])

    return(
        <div className = "show-product-detail-page">
            <NavBar/>
            {loading?<div className ="cargando"><ProgresGif/></div>:null }
            <div><ShowProductDetail key = {product.id} {...product}/></div>
            <div><ProductsRecomended/></div>
            <div><Footer/></div>
        </div>
    )
}