import React, {useState} from 'react'

const GetAllProductsContext = React.createContext({})

export function GetAllProductsContextProvider({children}){
    const [getAll, setGetAll] = useState(true)
    return (<GetAllProductsContext.Provider value = {{getAll, setGetAll}}>
        {children}
        </GetAllProductsContext.Provider>)
}

export default GetAllProductsContext