import React, {useState, useEffect} from 'react'
import {useInfoUser} from '../customHooks/useInfoUser'

const InfoUserContext = React.createContext({info:null, token:null})

export function InfoUserContextProvider({children}){
    const {info, token} = useInfoUser()
    const [infoUser, setInfoUser] = useState({info:null, token:null})

    useEffect(() => {
        setInfoUser({info:info, token:token})
    },[info])

    return (<InfoUserContext.Provider value = {{infoUser, setInfoUser}}>
        {children}
        </InfoUserContext.Provider>)
}

export default InfoUserContext