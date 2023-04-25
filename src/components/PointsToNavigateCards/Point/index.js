import React, {useEffect, useState} from "react";
import './index.css'

export default function Point({index, setPoint, cont}){
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if(index === cont){
            setIsActive(true)
        }else{
            setIsActive(false)
        }
    },[cont])
    return(
        <div>
            {isActive?
            <div className = "point-active"></div>
            :
            <div className = "point-not-active" onClick={() => setPoint(index)}></div>
            }
        </div>
    )
}