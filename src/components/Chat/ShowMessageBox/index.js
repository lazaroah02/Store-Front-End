import React, {useContext, useState, useEffect} from "react"
import './index.css'
import InfoUserContext from "../../../context/InfoUserContext"

export default function ShowMessageBox({message, from_user, timestamp}){
    const {infoUser} = useContext(InfoUserContext)
    const [boxStyle, setBoxStyle] = useState(null)

    useEffect(() => {
        if (infoUser.info !== null){
            let style = from_user === infoUser.info.username? "box-container box-float-right":"box-container box-float-left"
            setBoxStyle(style)
        }
    }, [infoUser])

    function formatMessageTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString().slice(0, 5);
      }
    
    return(
        <div>
            {boxStyle !== null?
                <div className = {boxStyle}>
                    <div className = "box">
                        {message}<p className = "timestamp">{formatMessageTimestamp(timestamp)}</p>
                    </div>
                </div>
                :null
            }
        </div> 
    )
}