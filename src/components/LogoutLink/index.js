import './index.css'
import React, {useContext, useState, useEffect} from 'react'
import InfoUserContext from '../../context/InfoUserContext'
import {useNavigate} from 'react-router-dom'
import logoutIcon from "../../assets/log-out-icon.svg"

export default function ShowLinks(){
    const {infoUser, setInfoUser} = useContext(InfoUserContext)
    const [, setLogged] = useState()
    const setNavigate = useNavigate()

    useEffect(() =>{
        infoUser === null?setLogged(false):setLogged(true)
    },[infoUser])
    
    function handleLogout(){
        window.localStorage.removeItem('SessionToken')
        setLogged(false)
        setInfoUser(null)
        setNavigate("/")
    }
    return(
        <div className = "button-container">
            <button className = "LogoutButton btn " onClick={() => handleLogout()}>
                <div>
                    <img alt = "log-out" src = {logoutIcon}/>
                    Cerrar Sesion
                </div>
            </button>
        </div>    
    )
}