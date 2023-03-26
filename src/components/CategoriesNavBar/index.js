import getCategories from "../../services/getCategories";
import Category from "../Category";
import React, { useState, useEffect, useRef } from "react";
import rightArrow from '../../assets/right-arrow-alt-regular-24.png'
import leftArrow from '../../assets/left-arrow-alt-regular-24.png'
import "./index.css";

export default function CategoriesNavBar() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef()
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  let cont = 0
  let width = window.innerWidth
  function goLeft(){
    if(cont > 0){
      cont -= 1
      scrollRef.current.scrollTo({
        left:cont*width, 
        top:0, 
        behavior:"smooth"
      })
    }
  }
  function goRight(){
    let increment = scrollRef.current.scrollWidth / window.innerWidth
    if(cont < increment){
      cont += 1
      scrollRef.current.scrollTo({
        left:cont*width, 
        top:0, 
        behavior:"smooth"
      })
    }
  }
  return (
    <div className = "CategoriesNavBarContainer">
        <div className="CategoriesNavBar" ref = {scrollRef}>
        <Category key={0} id={null} name={"All"} />
        {categories.map((category) => (
            <Category key={category.id} {...category} />
        ))}
        </div>
        <button className = "button-go-left btn" onClick = {() => goLeft()}>
          <img alt = "left-arrow" src = {leftArrow}/>
        </button>
        <button className = "button-go-right btn" onClick = {() => goRight()}>
          <img alt = "right-arrow" src = {rightArrow}/>
        </button>
    </div>

  );
}
