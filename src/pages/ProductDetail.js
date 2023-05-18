import React, {useEffect, useState} from 'react'
import getProductDetail from '../services/getProductDetail'
import ShowProductDetail from '../components/ShowProductDetail'
import NavBar from '../components/NavBar'
import ProgresGif from '../components/ProgresGif'
import {useParams} from 'react-router-dom'
import ShowFloatMessage from '../components/ShowFloatMessage'
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
            <ShowFloatMessage title={"Hello World"} message={"Hola papa"}/>
            {loading?<div className ="cargando"><ProgresGif/></div>:null }
            <div><ShowProductDetail key = {product.id} {...product}/></div>
        </div>
    )
}