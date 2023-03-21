import React, {useState} from 'react'

const Context = React.createContext({})

export function ProductOfSellerDetailProvider({children}){
    const [actualProduct, setActualProduct] = useState(undefined)
    return (<Context.Provider value = {{actualProduct, setActualProduct}}>
        {children}
        </Context.Provider>)
}

export default Context