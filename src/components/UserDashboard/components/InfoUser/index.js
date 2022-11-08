import React, {useEffect, useContext, useState} from 'react'
import getInfoUser from '../../../../services/getInfoUser'
import UserTokenContext from '../../../../context/UserTokenContext'
import InfoUserContext from '../../../../context/InfoUserContext'
import './index.css'

export default function InfoUser(){
    const {token,} = useContext(UserTokenContext)
    const {infoUser, setInfoUser} = useContext(InfoUserContext)

    useEffect(() => {
        getInfoUser(token)
        .then(data => setInfoUser(data[0]))
    },[token])
    return(
        <div className = 'info-user '>
            {infoUser === undefined || infoUser === null?null:
            <div className = 'info-user-container'>
                <p>{infoUser[0].email}</p>
                <p>{infoUser[0].username}</p>
                <p>{infoUser[0].name}</p>
                <p>{infoUser[0].last_name}</p>
                <p>{infoUser[0].state}</p>
                <p>{infoUser[0].zip_code}</p>
                <p>{infoUser[0].phone}</p>
                <p>{infoUser[0].country}</p>
                <p>{infoUser[0].address}</p>
            </div>
            }
        </div>
    )
}