import React, {useState} from 'react'

const Context = React.createContext({})

export function ActualComponentProvider({children}){
    const [actualComponent, setComponent] = useState('info-user')
    return (<Context.Provider value = {{actualComponent, setComponent}}>
        {children}
        </Context.Provider>)
}

export default Context