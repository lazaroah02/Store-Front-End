import React, {useState} from 'react'

const Context = React.createContext({})

export function ProductsCartContextProvider({children}){
    const [productsCart, setProductCart] = useState([])
    return (<Context.Provider value = {{productsCart, setProductCart}}>
        {children}
        </Context.Provider>)
}

export default Context