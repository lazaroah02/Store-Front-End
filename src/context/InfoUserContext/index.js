import React, {useState} from 'react'

const UserContext = React.createContext({})

export function InfoUserContextProvider({children}){
    const [token, setToken] = useState(
        () => window.localStorage.getItem('SessionToken')
    )
    return (<UserContext.Provider value = {{token, setToken}}>
        {children}
        </UserContext.Provider>)
}

export default UserContext