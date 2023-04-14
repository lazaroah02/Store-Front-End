import './index.css'
import React, {useContext, useState, useEffect} from 'react'
import UserTokenContext from '../../context/UserTokenContext'
import InfoUserContext from '../../context/InfoUserContext'
import {useLocation} from 'wouter'
import logoutIcon from "../../assets/log-out-icon.svg"

export default function ShowLinks(){
    const {token, setToken} = useContext(UserTokenContext)
    const {setInfoUser} = useContext(InfoUserContext)
    const [, setLogged] = useState()
    const [, setLocation] = useLocation()

    useEffect(() =>{
        token == null?setLogged(false):setLogged(true)
    },[token])
    
    function handleLogout(){
        window.localStorage.removeItem('SessionToken')
        setLogged(false)
        setToken(null)
        setInfoUser(null)
        setLocation("/")
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