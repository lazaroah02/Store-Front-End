import React, {useContext, useState, useEffect} from 'react'
import InfoUserContext from '../../context/InfoUserContext'
import {useNavigate} from 'react-router-dom'
import logoutIcon from "../../assets/log-out-icon.svg"
import "./index.css"

export default function ShowLinks(){
    const {infoUser, setInfoUser} = useContext(InfoUserContext)
    const [, setLogged] = useState()
    const setNavigate = useNavigate()

    useEffect(() =>{
        infoUser.token === null?setLogged(false):setLogged(true)
    },[infoUser])
    
    function handleLogout(){
        window.localStorage.removeItem('SessionToken')
        setLogged(false)
        setInfoUser({info:null, token:null})
        setNavigate("/")
    }
    return(
        <button className = "btn button-option " onClick={() => handleLogout()}>
            <img alt = "log-out" src = {logoutIcon}/>
            <span>Cerrar Sesion</span>
        </button>
    )
}