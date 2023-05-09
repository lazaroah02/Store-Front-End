import React, {useContext, useEffect, useState} from 'react';
import InfoUserContext from '../../context/InfoUserContext' 
import {useNavigate} from "react-router-dom"
import './index.css'

function LoginNavbarLink() {
    const {infoUser} = useContext(InfoUserContext)
    const [info, setInfo] = useState({info:null, token:null})
    const navigate = useNavigate()

    useEffect(() => {
        setInfo(infoUser)
    },[infoUser])
    return ( 
        <>
            {info.token != null?null:
                <div className = "login-navbar-link" onClick={() => navigate("/login")}>
                    Hola, inicia sesión aqui
                </div> 
            }
        </>
    );
}

export default LoginNavbarLink;