import React, {useState} from 'react'

const Context = React.createContext({})

export function ShowCreateProductModalContextProvider({children}){
    const [showCreateProductModal, setShowCreateProductModal] = useState(false)
    return (<Context.Provider value = {{showCreateProductModal, setShowCreateProductModal}}>
        {children}
        </Context.Provider>)
}

export default Context