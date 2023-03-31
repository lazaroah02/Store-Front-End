import React, {useContext} from 'react';
import {Link} from 'wouter'
import UserTokenContext from '../../context/UserTokenContext'
import userIcon from '../../assets/navBarIcons/LogoProfile.png'
import loginIcon from '../../assets/navBarIcons/log-in-regular-24.png'

export default function LogoProfile(){
    const {token} = useContext(UserTokenContext)
    return(
        <div>
            {token !== undefined && token !== null
            ?
            <Link to = "/user-profile/info">
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
            
        </div>
    )
}