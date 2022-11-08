import getCategories from '../../services/getCategories'
import Category from '../Category'
import React, {useState, useEffect} from 'react'
import './index.css'

export default function CategoriesNavBar(){
    const [categories, setCategories] = useState([])
     useEffect(() =>{
        getCategories().then(data => {setCategories(data)})
     },[])
    return(
        <div className = "CategoriesNavBar"><Category key={0} id = {null} name = {'All'}/>{categories.map(category => <Category key={category.id} {...category}/>)}</div>
    )
}