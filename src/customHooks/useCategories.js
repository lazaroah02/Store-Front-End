import {useState, useEffect} from 'react';
import getCategories from '../services/getCategories'

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true)

    useEffect(() => {
        getCategories()
        .then(categories => {
            setCategories(categories)
            setLoadingCategories(false)
        })
    },[])

    return ( {categories, loadingCategories} );
}

