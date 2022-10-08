import React, {useState} from 'react'

const InfoUserContext = React.createContext({})

export function InfoUserContextProvider({children}){
    const [infoUser, setInfoUser] = useState(undefined)
    return (<InfoUserContext.Provider value = {{infoUser, setInfoUser}}>
        {children}
        </InfoUserContext.Provider>)
}

export default InfoUserContext