import React, {useState, useEffect} from "react";
import getCategories from '../../services/getCategories'
import CategoryCard from './CategoryCard'
import Loader from '../Loader'
import "./index.css"

export default function HomeScreenCategories(){
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        getCategories()
        .then(data => {
            setCategories(data)
            setLoading(false)
        })
    },[])
    return(
        <div className = "home-screen-categories-container">
            <div className = "categories-title">
               - - - - - - - - Categorías - - - - - - - -                
            </div>
            {loading?<Loader/>:
                <div className = "home-screen-categories justify-content-center">
                    {categories.length > 0? categories.map(category => <CategoryCard key = {category.id} id = {category.id} name = {category.nombre} img = {category.img}/>):"no hay categorias para mostrar"}
                </div>
            }
        </div>
    )
}