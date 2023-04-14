import React, {useRef, useState, useEffect} from 'react';
import "./index.css";
import Card from '../Card';
import rightArrow from '../../assets/right-arrow-icon.svg'
import leftArrow from '../../assets/left-arrow-icon.svg'
import getRecommendedProducts from '../../services/getRecommendedProducts'

export default function ProductsRecomended(){
    const [items, setItems] = useState([])
    const scrollRef = useRef()
    useEffect(() => {
        getRecommendedProducts()
        .then((data) => {
            setItems(data)
        })
    },[])

    //useEffect to control the interval of scrolling the recomended products
    useEffect(() => {
        if(items.length > 0){
            let interval = setInterval(() => seeNextProduct(), 10000)
            return () => clearInterval(interval)
        }
    },[items])
    
    let cont = 0
    //handle previous item
    function seePreviousProduct(){
        if(items.length > 0){
        let increment = scrollRef.current.scrollWidth / items.length
        if(cont === 0){   //compruebo si se encuentra en el primer item y lo redirigo al ultimo
            cont = items.length
            return seePreviousProduct()
        }
        if(cont > 0){
            cont -= 1
            scrollRef.current.scrollTo({
                left:cont*increment, 
                top:0, 
                behavior:"smooth"
            })
        }  }
    }   
    //handle next item   
    function seeNextProduct(){
        if(items.length > 0){
        let increment = scrollRef.current.scrollWidth / items.length
        if(cont === items.length-1){  //compruebo si se encuentra en el ultimo item y lo redirigo al primero
            cont = -1
            return seeNextProduct()
        }
        if(cont < items.length){
            cont += 1
            scrollRef.current.scrollTo({
                left:cont*increment, 
                top:0, 
                behavior:"smooth"
            }) 
        }}
    }
    return(
        <div>
            <h5 className = "title">Productos Recomendados</h5>
            <section className = "ProductsRecomendedContainer" ref = {scrollRef}>
                {items.length > 0
                ?
                items.map((item) => <Card key = {item.id} {...item}/>)
                :
                <div className = "no-products-recommended">
                    <p>No hay Productos Recomendados</p>
                </div>
                }
            </section>

            <div>
                <button className = "boton-next-Product2 btn" onClick={() => seeNextProduct()}>
                    <img alt = "right-arrow" src = {rightArrow}/>
                </button>
                <button  className = "boton-previous-Product2 btn" onClick={() => seePreviousProduct()}>
                    <img alt = "left-arrow" src = {leftArrow}/>  
                </button> 
             </div>
        </div>
    )
}