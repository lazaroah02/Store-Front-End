import React, {useState, useEffect, useRef} from "react";
import {getSpecialPromotions} from '../../services/getSpecialPromotions'
import PromocionesEspecialesCard from './PromocionesEspecialesCard'
import {useNavigateItems} from '../../customHooks/useNavigateItems'
import PointsToNavigateCards from "../PointsToNavigateCards";
import './index.css'

export default function PromocionesEspeciales(){
    const scrollRef = useRef()
    const [specialPromotions, setSpecialPromotions] = useState([])
    const {contador, updateCont} = useNavigateItems(scrollRef, specialPromotions)

    useEffect(() => {
        getSpecialPromotions()
        .then(data => setSpecialPromotions(data))
    }, [])

    return(
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
    )
}