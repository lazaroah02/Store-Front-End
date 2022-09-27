import './index.css'
import {useContext} from 'react'
import CategoriesContext from '../../context/CategoriesContext'

export default function Category({id, name}){
    const categoryContext = useContext(CategoriesContext)
    const {category, setCategory} = categoryContext

    return(
        <div 
            className = "Category" 
            onClick ={() => setCategory(id)}
            >
            {name}
            
        </div>
    )
}