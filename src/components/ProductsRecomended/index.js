import React, {useRef, useState, useEffect} from 'react';
import "./index.css";
import Card from '../Card';
import rightArrow from '../../assets/right-arrow-alt-regular-24.png'
import leftArrow from '../../assets/left-arrow-alt-regular-24.png'

export default function ProductsRecomended(){
    const [items, setItems] = useState([])
    const scrollRef = useRef()
    useEffect(() => {
        setItems ([
            {id:1, name:"Primero", precio: "100", foto: ""},
            {id:2, name:"Segundo", precio: "100", foto: ""},
            {id:3, name:"Tercero", precio: "100", foto: ""},
            {id:4, name:"Cuarto", precio: "100", foto: ""},
            {id:5, name:"Quinto", precio: "100", foto: ""},
            {id:6, name:"Ultimo", precio: "100", foto: ""},
        ])
    },[])

    //useEffect to control the interval of scrolling the recomended products
    useEffect(() => {
        let interval = setInterval(() => seeNextProduct(), 10000)
        return () => clearInterval(interval)
    },[items])
    
    let cont = 0
    //handle previous item
    function seePreviousProduct(){
        let increment = scrollRef.current.scrollWidth / items.length
        if(cont == 0){   //compruebo si se encuentra en el primer item y lo redirigo al ultimo
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
        }  
    }   
    //handle next item   
    function seeNextProduct(){
        let increment = scrollRef.current.scrollWidth / items.length
        if(cont == items.length-1){  //compruebo si se encuentra en el ultimo item y lo redirigo al primero
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
        }
    }
    return(
        <div>
            <h5 className = "title">Productos Recomendados</h5>
            <section className = "ProductsRecomendedContainer" ref = {scrollRef}>
                {items.map((item) => <Card key = {item.id} {...item}/>)}
            </section>

            <div>
                <button className = "boton-next-Product2 btn" onClick={() => seeNextProduct()}>
                    <img src = {rightArrow}/>
                </button>
                <button  className = "boton-previous-Product2 btn" onClick={() => seePreviousProduct()}>
                    <img src = {leftArrow}/>  
                </button> 
             </div>
        </div>
    )
}