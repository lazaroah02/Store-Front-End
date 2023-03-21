import React, {useState} from 'react'

const Context = React.createContext({})

export function UpdateProductDetailProvider({children}){
    const [updateProductDetail, setUpdateProductDetail] = useState(0)
    return (<Context.Provider value = {{updateProductDetail, setUpdateProductDetail}}>
        {children}
        </Context.Provider>)
}

export default Context