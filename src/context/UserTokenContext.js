import React, {useState} from 'react'

const UserTokenContext = React.createContext({})

export function UserTokenContextProvider({children}){
    const [token, setToken] = useState(
        () => window.localStorage.getItem('SessionToken')
    )
    return (<UserTokenContext.Provider value = {{token, setToken}}>
        {children}
        </UserTokenContext.Provider>)
}

export default UserTokenContext