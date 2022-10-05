import './index.css'
import React,{useContext} from 'react'
import CategoriesContext from '../../context/CategoriesContext'

export default function Category({id, name}){
    const categoryContext = useContext(CategoriesContext)
    const {setCategory} = categoryContext
    return(
        <button 
            className = "Category" 
            onClick ={() => setCategory(id)}
            >
            {name}
            
        </button>
    )
}