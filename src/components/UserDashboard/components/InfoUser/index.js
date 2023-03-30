import React, {useEffect, useContext, useState} from 'react'
import getInfoUser from '../../../../services/getInfoUser'
import UserTokenContext from '../../../../context/UserTokenContext'
import InfoUserContext from '../../../../context/InfoUserContext'
import './index.css'

export default function InfoUser(){
    const {token,} = useContext(UserTokenContext)
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
        <div className = 'info-user '>
            {info === null?null:
            <div className = 'info-user-container'>
                <p>{info.email}</p>
                <p>{info.username}</p>
                <p>{info.name}</p>
                <p>{info.last_name}</p>
                <p>{info.state}</p>
                <p>{info.zip_code}</p>
                <p>{info.phone}</p>
                <p>{info.country}</p>
                <p>{info.address}</p>
            </div>
            }
        </div>
    )
}