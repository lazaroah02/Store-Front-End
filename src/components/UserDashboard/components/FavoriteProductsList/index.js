import React, {useEffect, useState, useContext} from 'react';
import NavBar from '../../../NavBar'
import GenerateCards from '../../../GenerateCards'
import Loader from '../../../Loader'
import { getFavoriteProductsList } from '../../../../services/getFavoriteProductsList';
import {getIdOfProductsInFavoriteList} from '../../../../services/getIdOfProductsInFavoriteList'
import InfoUserContext from '../../../../context/InfoUserContext';
import BackArrowIcon from '../../../../assets/back-arrow.svg'
import Heart from '../../../../assets/heart.svg'
import './index.css'
import '../user-dashboard-panel-styles.css'

function FavoriteList() {
    //favorite products list
    const [favoriteList, setFavoriteList] = useState([])
    //ids of favorite products 
    const [favoriteProductsId, setFavoriteProductsId] = useState([])
    const [loading, setLoading] = useState(false)
    const {infoUser} = useContext(InfoUserContext)

    //get the favorite products list
    useEffect(() => {
        setLoading(true)
        getFavoriteProductsList({token:infoUser.token})
        .then(data => {
            setFavoriteList(data.results[0].products)
            setLoading(false)
        })
    },[])

    //get the ids of favorite products
    useEffect(() => {
        if(infoUser.token !== null){
            getIdOfProductsInFavoriteList({token:infoUser.token})
            .then(data => {
                setFavoriteProductsId(data.products)
            })
        }
    },[infoUser])

    return ( 
    <div className = "user-dashboard-panel-container">
        <NavBar/>
        <div className = "favorite-list-panel">
            {loading
            ?
            <div className = "loader-container"><Loader/></div>
            :
            <div className = "favorite-products-container">
                <div className = "favorite-products-title-container">
                    <img className = "back-arrow" alt = "back" src = {BackArrowIcon} onClick={() => window.history.back()}/>
                    <div>Lista de Favoritos</div>
                    <img alt = "orders-history" src = {Heart}/>
                </div>
                <GenerateCards 
                    products={favoriteList} 
                    loading={loading}
                    favoriteProducts={favoriteProductsId}
                    />
            </div>
            }
        </div>
    </div> );
}

export default FavoriteList;