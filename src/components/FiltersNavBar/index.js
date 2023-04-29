import React, {useState, useEffect} from 'react';
import CategoriesFilter from './Filters/CategoriesFilter';
import PriceFilter from './Filters/PriceFilter';
import OrderBy from './Filters/OrderBy'
import ActiveFilter from './ActiveFilter'
import { useLocation } from 'react-router-dom';
import "./index.css"
import { checkActiveFilters } from './checkActiveFilters';

export default function FiltersNavBar(){
    const [activeFilters, setActiveFilters] = useState([])
    const [filterToRemove, setFilterToRemove] = useState(null)
    const {pathname} = useLocation()

    useEffect(() => {
        setActiveFilters(checkActiveFilters(pathname))
    },[pathname])

    function handleRemoveFilter(filterName){
        setFilterToRemove(filterName)
    }

    return(
        <div className = "filters-nav-bar">
            <p>Filtros:</p>
            <CategoriesFilter filterToRemove = {filterToRemove}/>
            <PriceFilter filterToRemove = {filterToRemove}/>
            <OrderBy filterToRemove = {filterToRemove}/>
            <p>Filtros activos:</p>
            {activeFilters.length === 0?null:
            <>
            {activeFilters.map((filter, index) => 
            <ActiveFilter 
                key = {index} 
                filterName={filter} 
                handleRemoveFilter = {handleRemoveFilter}/>)}
            </>
            }
        </div>
    )
}