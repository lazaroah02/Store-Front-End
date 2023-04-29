import React, {useRef, useState, useEffect} from 'react';
import "./index.css";
import ProductsRecomendedCard from './ProductsRecomendedCards';
import getRecommendedProducts from '../../services/getRecommendedProducts'

export default function ProductsRecomended(){
    const [items, setItems] = useState([])
    const scrollRef = useRef()
    useEffect(() => {
        getRecommendedProducts()
        .then((data) => {
            setItems(data.results)
        })
    },[])
     
    return(
        <div className = "products-recomended">
            <div className = "recomended-products-title-container">
                <div className = "recomended-products-title">
                    <p>Productos Recomendados</p>
                </div>
            </div>
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
        </div>
    )
}