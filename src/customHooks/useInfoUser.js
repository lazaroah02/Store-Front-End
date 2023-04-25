import getInfoUser from '../services/getInfoUser'
import {useState, useEffect} from 'react'

export function useInfoUser(){
    const [info, setInfo] = useState(null)
    const token = window.localStorage.getItem('SessionToken')

    useEffect(() => {
        if(token !== undefined && token !== null){
            getInfoUser(token)
            .then((data) => {
                setInfo(data)
            })
        }
    },[])
    return({info, token})}