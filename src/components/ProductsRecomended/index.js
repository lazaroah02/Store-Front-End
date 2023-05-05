import React, {useRef, useState, useEffect} from 'react';
import ProductsRecomendedCard from './ProductsRecomendedCards';
import getRecommendedProducts from '../../services/getRecommendedProducts'
import Loader from '../Loader'
import {Link} from 'react-router-dom'
import "./index.css";

export default function ProductsRecomended(){
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const scrollRef = useRef()
    useEffect(() => {
        setLoading(true)
        getRecommendedProducts()
        .then((data) => {
            setItems(data.results)
            setLoading(false)
        })
    },[])
     
    return(
        <div className = "products-recomended">
            <div className = "recomended-products-title-container">
                <div className = "recomended-products-title">
                    <p>Productos Recomendados</p>
                </div>
            </div>
            {loading?<Loader/>:
                <section className = "ProductsRecomendedContainer justify-content-center" ref = {scrollRef}>
                    {items.length > 0
                    ?
                    items.map((item) => <ProductsRecomendedCard key = {item.id} {...item}/>)
                    :
                    <div className = "no-products-recommended">
                        <p>No hay Productos Recomendados</p>
                    </div>
                    }
                </section>
            }
            <div className = "ver-mas-productos-recomendados-link"><Link to = "/products/recommended=1">Ver mas</Link></div>
        </div>
    )
}