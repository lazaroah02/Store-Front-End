import React, {useState} from 'react'

const Context = React.createContext({})

export function ShowEditProductModalContextProvider({children}){
    const [showEditProductModal, setShowEditProductModal] = useState(false)
    return (<Context.Provider value = {{showEditProductModal, setShowEditProductModal}}>
        {children}
        </Context.Provider>)
}

export default Context