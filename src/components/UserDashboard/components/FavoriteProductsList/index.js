import React, {useEffect, useState, useContext} from 'react';
import NavBar from '../../../NavBar'
import OptionsNavBar from '../OptionsNavBar'
import GenerateCards from '../../../GenerateCards'
import Loader from '../../../Loader'
import { getFavoriteProductsList } from '../../../../services/getFavoriteProductsList';
import {getIdOfProductsInFavoriteList} from '../../../../services/getIdOfProductsInFavoriteList'
import InfoUserContext from '../../../../context/InfoUserContext';
import './index.css'
import '../user-dashboard-panel-styles.css'

function FavoriteList() {
    const [favoriteList, setFavoriteList] = useState([])
    //id of hte favorite products 
    const [favoriteProducts, setFavoriteProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {infoUser} = useContext(InfoUserContext)

    useEffect(() => {
        setLoading(true)
        getFavoriteProductsList({token:infoUser.token})
        .then(data => {
            setFavoriteList(data.results[0].products)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        if(infoUser.token !== null){
            getIdOfProductsInFavoriteList({token:infoUser.token})
            .then(data => {
                setFavoriteProducts(data.products)
            })
        }
    },[infoUser])

    return ( 
    <div className = "user-dashboard-panel-container">
        <NavBar/>
        <OptionsNavBar/>
        <div className = "user-dashboard-panel">
            {loading
            ?
            <div className = "loader-container"><Loader/></div>
            :
            <div className = "favorite-products-container">
                <GenerateCards 
                    products={favoriteList} 
                    loading={loading}
                    favoriteProducts={favoriteProducts}
                    />
            </div>
            }
        </div>
    </div> );
}

export default FavoriteList;