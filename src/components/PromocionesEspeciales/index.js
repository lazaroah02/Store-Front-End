import React, {useState, useEffect, useRef} from "react";
import {getSpecialPromotions} from '../../services/getSpecialPromotions'
import PromocionesEspecialesCard from './PromocionesEspecialesCard'
import {useNavigateItems} from '../../customHooks/useNavigateItems'
import PointsToNavigateCards from "../PointsToNavigateCards";
import Loader from '../Loader'
import './index.css'

export default function PromocionesEspeciales(){
    const scrollRef = useRef()
    const [specialPromotions, setSpecialPromotions] = useState([])
    const {contador, updateCont} = useNavigateItems(scrollRef, specialPromotions)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getSpecialPromotions()
        .then(data => {
            setSpecialPromotions(data)
            setLoading(false)
        })
    }, [])

    return(
        <>
            {loading?<Loader/>:
                <>
                {specialPromotions.length > 0?
                    <div className = "flex-container">
                            <div className = "special-promotions-container" ref = {scrollRef}>
                                {specialPromotions.map(promotion => 
                                    <PromocionesEspecialesCard 
                                        key = {promotion.id} 
                                        {...promotion} 
                                        />)}
                            </div>
                            <PointsToNavigateCards setPoint = {updateCont} items = {specialPromotions} cont = {contador}/>               
                    </div>
                :null}
                </>
            }
        </>
    )
}