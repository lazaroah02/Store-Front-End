import React, {useEffect, useContext, useState} from 'react'
import getInfoUser from '../../../../services/getInfoUser'
import UserTokenContext from '../../../../context/UserTokenContext'
import InfoUserContext from '../../../../context/InfoUserContext'
import EditInfoUserForm from '../EditInfoUserForm'
import NavBar from '../../../NavBar'
import OptionsNavBar from '../OptionsNavBar'
import './index.css'

export default function InfoUser(){
    const {token} = useContext(UserTokenContext)
    const {setInfoUser} = useContext(InfoUserContext)
    const [info, setInfo] = useState(null)

    useEffect(() => {
        getInfoUser(token)
        .then(data => {
            setInfoUser(data)
            setInfo(data)
        })
    },[token])

    return(
        <div className = 'info-user'>
            <NavBar/>
            <OptionsNavBar/>
            {info === null || info === undefined?null:
            <div>
                <EditInfoUserForm/>
            </div>
            }
        </div>
    )
}