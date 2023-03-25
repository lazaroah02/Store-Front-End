import React from 'react';
import "./index.css";
import Card from '../Card';
import rightArrow from '../../assets/right-arrow-alt-regular-24.png'
import leftArrow from '../../assets/left-arrow-alt-regular-24.png'

export default function ProductsRecomended(){
    const items = [
        {id:1, name:"Primero", precio: "100", foto: ""},
        {id:2, name:"Segundo", precio: "100", foto: ""},
        {id:3, name:"Tercero", precio: "100", foto: ""},
        {id:4, name:"Cuarto", precio: "100", foto: ""},
        {id:5, name:"Quinto", precio: "100", foto: ""},
        {id:6, name:"Ultimo", precio: "100", foto: ""},
    ]

    let cont = 0
    //handle previous item
    function seePreviousProduct(){
        if(cont == 0){   //compruebo si se encuentra en el primer item y lo redirigo al ultimo
            cont = items.length
            return seePreviousProduct()
        }
        if(cont > 0){
            cont -= 1
            let item = document.getElementById(items[cont].id)
            item.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }   
    //handle next item   
    function seeNextProduct(){
        if(cont == items.length-1){  //compruebo si se encuentra en el ultimo item y lo redirigo al primero
            cont = -1
            return seeNextProduct()
        }
        if(cont < items.length-1){
            cont += 1
            let item = document.getElementById(items[cont].id)
            item.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }
    return(
        <div>
            <h5 class = "title">Productos Recomendados</h5>
            <section className = "ProductsRecomendedContainer">
                {items.map((item) => <Card {...item}/>)}
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