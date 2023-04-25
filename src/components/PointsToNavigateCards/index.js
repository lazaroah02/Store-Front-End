import React from 'react';
import Point from './Point'
import './index.css'

export default function PointsToNavigateCards({items, setPoint, cont}){
    return(
        <div className = "points-container">
            {items.length > 0?
                items.map((item,index) => <Point key = {item.id} index={index} setPoint={setPoint} cont = {cont}/>)
            :null}
        </div>
    )
}