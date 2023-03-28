import React, {useState} from 'react'

const PriceFilterContext = React.createContext({})

export function PriceFilterContextProvider({children}){
    const [price, setPrice] = useState(null)
    return (<PriceFilterContext.Provider value = {{price, setPrice}}>
        {children}
        </PriceFilterContext.Provider>)
}

export default PriceFilterContext