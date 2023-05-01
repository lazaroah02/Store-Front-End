import React, {useState, useEffect} from 'react';
import CategoriesFilter from './Filters/CategoriesFilter';
import PriceFilter from './Filters/PriceFilter';
import OrderBy from './Filters/OrderBy'
import { useLocation } from 'react-router-dom';
import "./index.css"
import { checkActiveFilters } from '../../helpFunctions/checkActiveFilters';

export default function FiltersNavBar({topRef}){
    const [activeFilters, setActiveFilters] = useState([])
    const {pathname} = useLocation()

    useEffect(() => {
        setActiveFilters(checkActiveFilters(pathname))
    },[pathname])

    return(
        <div className = "filters-nav-bar" ref = {topRef}>
            <div className = "filter">Filtros:</div>
            <CategoriesFilter activeFilters = {activeFilters}/>
            <PriceFilter activeFilters = {activeFilters}/>
            <OrderBy activeFilters = {activeFilters}/>
        </div>
    )
}