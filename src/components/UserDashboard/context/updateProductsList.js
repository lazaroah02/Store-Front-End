import React, {useState} from 'react'

const Context = React.createContext({})

export function UpdateProductsListProvider({children}){
    const [updateProductsList, setUpdateProductList] = useState(0)
    return (<Context.Provider value = {{updateProductsList, setUpdateProductList}}>
        {children}
        </Context.Provider>)
}

export default Context