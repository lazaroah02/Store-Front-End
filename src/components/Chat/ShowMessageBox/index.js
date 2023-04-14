import React from "react"
import './index.css'

export default function ShowMessageBox({user, message, infoUser}){
    console.log(user, message, infoUser)
    const boxStyle = user === infoUser.username? "box-container box-float-right":"box-container box-float-left"
    return(
        <div className = {boxStyle}>
            <div className = "box">
                {message}
            </div>
        </div>
    )
}