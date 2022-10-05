import './index.css'
import React, {useContext, useState, useEffect} from 'react'
import LogoProfile from '../LogoProfile'
import {Link} from 'wouter'
import InfoUserContext from '../../context/InfoUserContext'

export default function ShowLinks(){
    const {token, setToken} = useContext(InfoUserContext)
    const [islogged, setLogged] = useState()

    useEffect(() =>{
        token == null?setLogged(false):setLogged(true)
    },[token])
    
    function handleLogout(){
        window.localStorage.removeItem('SessionToken')
        setLogged(false)
        setToken(null)
    }
    return(
        <div className = "ItemsContainer">
            <LogoProfile/>
            {islogged?
            <button className = "LogoutButton btn btn-primary" onClick={() => handleLogout()}>Logout</button>:
            <div>
            <Link className = "LoginLink" to = "/login">Sing in</Link>
            <div className = "card Border">
              <Link className = "SignUpLink" to = "/register"> Sing up</Link>
            </div>
            </div>
            }
        </div>    
    )
}