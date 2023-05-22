import React, {useRef, useState, useEffect} from 'react';
import ProductsRecomendedCard from './ProductsRecomendedCards';
import getRecommendedProducts from '../../services/getRecommendedProducts'
import {useNavigateItems} from '../../customHooks/useNavigateItems'
import Loader from '../Loader'
import LeftArrow from '../../assets/left-arrow-icon.svg'
import RightArrow from '../../assets/right-arrow-icon.svg'
import "./index.css";

export default function ProductsRecomended(){
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const scrollRef = useRef()
    const {contador, updateCont} = useNavigateItems(scrollRef, false)

    useEffect(() => {
        setLoading(true)
        getRecommendedProducts()
        .then((data) => {
            setItems(data.results)
            setLoading(false)
        })
    },[])

    function goLeft(){
        if(contador > 0){
            updateCont(contador - 1)
        }
    }

    function goRight(){
        let itemsLength = Math.round(scrollRef.current.scrollWidth/scrollRef.current.offsetWidth)
        if(contador < itemsLength - 1){
            updateCont(contador + 1)
        }
    }

    return(
        <div className = "products-recomended">
            {loading?<Loader/>:
                <section className = "ProductsRecomendedContainer" ref = {scrollRef}>
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
            <button className = "btn-to-navigate button-go-left" onClick={() => goLeft()}><img alt = "left-arrow" src ={LeftArrow}/></button>
            <button className = "btn-to-navigate button-go-right" onClick={() => goRight()}><img alt = "right-arrow" src ={RightArrow}/></button>
        </div>
    )
}