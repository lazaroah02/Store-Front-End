import React from 'react';
import "./index.css";
import Card from '../Card';
import rightArrow from '../../assets/right-arrow-alt-regular-24.png'
import leftArrow from '../../assets/left-arrow-alt-regular-24.png'

export default function ProductsRecomended(){
    const items = [
        {id:1, name:"Perro", precio: "$100", foto: ""},
        {id:2, name:"Perro", precio: "$100", foto: ""},
        {id:3, name:"Perro", precio: "$100", foto: ""},
    ]

    //handle next item   
    let contador = -1
    console.log("a")
    function seeNextImage(){
        if(contador < 2 && contador >= -1){
            if(contador === -1){
                contador += 2
            }else{
                contador += 1
            }
            let item = document.getElementById(items[contador].id)
            item.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }
    //handle previous image
    function seePreviousImage(){
        if(contador <= 3 && contador > 0){
            contador -= 1
            let item = document.getElementById(items[contador].id)
            item.scrollIntoView({behavior:"smooth",block:"center", inline:"center"})
        }  
    }    
    return(
        <div class = "items-container">
            <p class = "title">Productos Recomendados</p>
            <section className = "PhotosDetailContainer ">
                {items.map((item) => <Card {...item}/>)}
            </section>

            <div>
                <button className = "boton-next-image2 btn" onClick={() => seeNextImage()}>
                    <img src = {rightArrow}/>
                </button>
                <button  className = "boton-previous-image2 btn" onClick={() => seePreviousImage()}>
                    <img src = {leftArrow}/>  
                </button> 
             </div>
        </div>
    )
}