import React, {useEffect, useState} from 'react'
import getProductDetail from '../services/getProductDetail'
import ShowProductDetail from '../components/ShowProductDetail'
import NavBar from '../components/NavBar'
import ProgresGif from '../components/ProgresGif'

export default function ProductDetail({params}) {
    const {keyword} = params
    const [product, setProduct] = useState([])
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
            <div>{product.map(el => <ShowProductDetail key = {el} {...el}/>)}</div>
        </div>
    )
}