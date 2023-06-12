import React, {useState} from 'react'

const Context = React.createContext({})

export function ProductsCartContextProvider({children}){
    const [productsCart, setProductCart] = useState([
        {id: 1, name: 'Pulover', price: 100, cantidad: 1, subtotal: 100},
        {id: 5, name: 'Perro', price: 10000, cantidad: 1, subtotal: 10880},
        {id: 3, name: 'Pulogr', price: 1044440, cantidad: 1, subtotal: 100},
    ])
    return (<Context.Provider value = {{productsCart, setProductCart}}>
        {children}
        </Context.Provider>)
}

export default Context