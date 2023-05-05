import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import InfoUserContext from '../../context/InfoUserContext'
import userIcon from '../../assets/navBarIcons/logo-profile.svg'
import loginIcon from '../../assets/navBarIcons/log-in-icon.svg'

export default function LogoProfile(){
    const {infoUser} = useContext(InfoUserContext)
    return(
        <div>
            {infoUser !== null?
            <>
                {infoUser.info !== null
                ?
                <Link to = "/user/info">
                    <div>
                        <img alt = "user-profile" src = {userIcon}></img>
                    </div>
                </Link>
                :
                <Link to = "/login">
                    <div>
                        <img alt = "login" src = {loginIcon}></img>
                    </div>
                </Link>  
                }
            </>
            :null
            }
            
        </div>
    )
}