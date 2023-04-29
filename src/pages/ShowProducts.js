import React from 'react';
import NavBar from '../components/NavBar'
import GenerateCards from '../components/GenerateCards';
import FiltersNavBar from '../components/FiltersNavBar';
import {useParams} from 'react-router-dom'
import './pagesStyles/showProducts.css'

export default function ShowProducts(){
    const keyword = useParams()
    return(
        <div className = "ShowProducts">
            <NavBar/>
            <FiltersNavBar/>
            <GenerateCards keyword = {keyword}/>
        </div>
    )
}