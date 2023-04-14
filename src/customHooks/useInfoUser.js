import getInfoUser from '../services/getInfoUser'
import {useState, useEffect, useContext} from 'react'
import UserTokenContext from '../context/UserTokenContext'

export function useInfoUser(){
    const [infoUser, setInfoUser] = useState()
    const {token} = useContext(UserTokenContext)

    useEffect(() => {
        if(token !== undefined && token !== null){
            const {info} = Promise.all([
                getInfoUser(token),
            ]
            ).then((data) => {
                setInfoUser(data[0])
            })
        }
    },[])
    return([infoUser, setInfoUser])
}