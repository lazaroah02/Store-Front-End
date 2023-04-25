import React, {useEffect, useState} from 'react'
import getProductDetail from '../services/getProductDetail'
import ShowProductDetail from '../components/ShowProductDetail'
import NavBar from '../components/NavBar'
import ProgresGif from '../components/ProgresGif'
import {useParams} from 'react-router-dom'

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
        <div className = "App">
            <NavBar/>
            {loading?<div className ="cargando"><ProgresGif/></div>:null }
            <div><ShowProductDetail key = {product.id} {...product}/></div>
        </div>
    )
}