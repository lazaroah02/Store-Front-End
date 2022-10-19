import React, {useContext, useState} from 'react';
import {useLocation} from 'wouter'
import searchAnProduct from '../../services/searchAnProduct'
import InfoSearchedProduct from '../../context/InfoSearchedProduct'
import CategoriesContext from '../../context/CategoriesContext'
import './index.css'

export default function SearchProductForm(){

    const {setInfoSearchedProduct} = useContext(InfoSearchedProduct)
    const {setCategory} = useContext(CategoriesContext)
    const [location, setLocation] = useLocation()
    const [loading, setLoading] = useState(false)
    
    function handleSearchSubmit(e){
        e.preventDefault()
        let nameProduct = e.target[0].value
        console.log(nameProduct)
        if(nameProduct === ''){
            if(location === '/About_us' || location === '/login' || location === '/register'){
                setLocation('/')
            }
            else{
                setCategory()
            }
        }
        else{
            setLoading(true)
            searchAnProduct(nameProduct)
            .then(data => {
                setInfoSearchedProduct(data)
                setLoading(false)
            })
            .catch(err => {
                setInfoSearchedProduct(['Not Found'])
                setLoading(false)
            })
        } 
    }
    return(
        <form className="d-flex SearchForm" onSubmit = {(e) => handleSearchSubmit(e)}>
        <input className="form-control me-2" placeholder="Search a product" />
        <button className="btn btn-success" >{loading?'Cargando...':'Search'}</button>
      </form>
    )
}