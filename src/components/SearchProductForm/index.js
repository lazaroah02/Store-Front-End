import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import {useCategories} from '../../customHooks/useCategories'
import searchIcon from '../../assets/navBarIcons/search-icon.svg'
import {checkActiveFilters} from '../../helpFunctions/checkActiveFilters'
import CatIcon from '../../assets/navBarIcons/category.svg'
import Loader from '../Loader'
import './index.css'

export default function SearchProductForm(){
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {categories, loadingCategories} = useCategories()
    const [actualCategory, setActualCategory] = useState({name:"Todas", id:""})

    //useEffect para recuperar la categoria actual
    useEffect(() => {
        if(categories.length > 0){
        let categoryUrlId = ""
        let category = "Todas"
        let activeFilters = checkActiveFilters(pathname)

        //recorro la lista de filtros actuales para ver si esta categoria
        for(let i = 0; i < activeFilters.length; i++){
            if(activeFilters[i].filter === "categoria") categoryUrlId = activeFilters[i].value
        }
        
        //recupero de la lista de categorias el nombre para mostrarlo
        for(let i = 0; i < categories.length; i++){
            if(`${categories[i].id}` === categoryUrlId) category = categories[i].nombre
        }
        setActualCategory({name:category, id:categoryUrlId})
        }
    },[pathname, categories])

    function handleSetCategory(category){
        setActualCategory(category)
        navigate(`/products/categoria=${category.id}`)
    }
    
    function handleSearchSubmit(e){
        e.preventDefault()
        let nameProduct = e.target[0].value
        navigate(`/products/search=${nameProduct}`)
    }
    return(
        <>
            <div className = "search-form-container">
                <form className="d-flex SearchForm" onSubmit = {(e) => handleSearchSubmit(e)}>
                    <input className=" search-input" placeholder="Buscar en Bestore..."/>
                    <button className="search-button"><img alt = "buscar" src = {searchIcon}/></button>
                    <div className="dropdown dropdown-categories-search">
                        <button 
                            className=" show-dropdow-button" 
                            data-bs-toggle="dropdown"
                            >
                            <div>{actualCategory.name}</div>
                            <img alt = "cat" src = {CatIcon}/>
                        </button>
                        <ul className="dropdown-menu">
                            {loadingCategories?<Loader/>:
                            <>
                                {categories.length === 0?null:
                                <>
                                    <li className = "dropdown-item li-category" onClick={() => handleSetCategory({name:"Todos", id:""})}>{actualCategory.name}</li>
                                    {categories.map(cat => 
                                    <li key = {cat.id} className = "dropdown-item li-category" onClick={() => handleSetCategory({name:cat.nombre, id:cat.id})}>{cat.nombre}</li>
                                    )}
                                </>
                                }
                            </>
                            }
                        </ul>
                    </div>
                </form>
            </div>            
      </>
    )
}