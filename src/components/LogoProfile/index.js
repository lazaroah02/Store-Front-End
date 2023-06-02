import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import InfoUserContext from '../../context/InfoUserContext'
import userIcon from '../../assets/navBarIcons/logo-profile.svg'
import LoginIcon from '../../assets/navBarIcons/log-in-icon.svg'
import "./index.css"

export default function LogoProfile(){
    const {infoUser} = useContext(InfoUserContext)
    const navigate = useNavigate()
    return(
        <>
            {infoUser.info !== null
            ?
            <div className = "user-profile-icon-container" onClick={() => navigate("/user/info")}>
                <img alt = "user-profile" src = {userIcon}/>
                <div className = "user-profile-text">Perfil</div>
            </div>
            :
            <div className = "user-profile-icon-container" onClick={() => navigate("/login")}>
                <img alt = "user-profile" src = {LoginIcon}/>
                <div className = "user-profile-text">Entrar</div>
            </div>
            }
        </>
    )
}