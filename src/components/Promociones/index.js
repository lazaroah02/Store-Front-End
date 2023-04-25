import React, {useState, useEffect} from "react";
import "./index.css"
import PromocionesCards from './PromocionesCards'
import {getPromotions} from '../../services/getPromotions'

export default function Promociones(){
    const [promotions, setPromotions] = useState([])

    useEffect(() => {
        getPromotions()
        .then(data => setPromotions(data))
    },[])
    return(
        <>
            {promotions.length > 0?
            <div className = "promociones">
                {promotions.map(promotion =><PromocionesCards key = {promotion.id} {...promotion}/>)}
            </div>
            :null}
        </>
    )
}