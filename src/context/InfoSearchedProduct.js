import React, {useState} from 'react'

const Context = React.createContext({})

export function InfoSearchedProduct({children}){
    const [infoSearchedProduct, setInfoSearchedProduct] = useState([])
    return (<Context.Provider value = {{infoSearchedProduct, setInfoSearchedProduct}}>
        {children}
        </Context.Provider>)
}

export default Context