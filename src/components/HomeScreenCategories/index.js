import React, {useState, useEffect} from "react";
import getCategories from '../../services/getCategories'
import CategoryCard from './CategoryCard'
import "./index.css"

export default function HomeScreenCategories(){
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
        .then(data => setCategories(data))
    },[])
    return(
        <div className = "home-screen-categories-container">
            <div className = "categories-title">
               - - - - - - - - Categorías - - - - - - - -                
            </div>
            <div className = "home-screen-categories justify-content-center">
                {categories.length > 0? categories.map(category => <CategoryCard key = {category.id} id = {category.id} name = {category.nombre} img = {category.img}/>):"no hay categorias para mostrar"}
            </div>
        </div>
    )
}