import React, {useContext} from 'react';
import {useLocation} from 'wouter'
import searchAnProduct from '../../services/searchAnProduct'
import InfoSearchedProduct from '../../context/InfoSearchedProduct'
import CategoriesContext from '../../context/CategoriesContext'
import './index.css'

export default function SearchProductForm(){

    const {setInfoSearchedProduct} = useContext(InfoSearchedProduct)
    const {setCategory} = useContext(CategoriesContext)
    const [location, setLocation] = useLocation()

    function handleSearchSubmit(e){
        e.preventDefault()
        const nameProduct = e.target[0].value
        if(nameProduct === ''){
            if(location === '/About_us' || location === '/login' || location === '/register'){
                setLocation('/')
            }
            else{
                setCategory(0)
            }
        }
        else{
            searchAnProduct(nameProduct)
        .then(data => setInfoSearchedProduct(data))
        .catch(err => setInfoSearchedProduct(['Not Found']))
        } 
    }
    return(
        <form class="d-flex SearchForm" onSubmit = {(e) => handleSearchSubmit(e)}>
        <input class="form-control me-2" type="search" placeholder="Search a product" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    )
}