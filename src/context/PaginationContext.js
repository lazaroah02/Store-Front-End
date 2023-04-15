import React, {useState} from 'react'

const PaginationContext = React.createContext({})

export function PaginationContextProvider({children}){
    const [desde, setDesde] = useState(0)
    const [hasta, setHasta] = useState(24)
    return (<PaginationContext.Provider value = {{desde, hasta, setDesde, setHasta}}>
        {children}
        </PaginationContext.Provider>)
}

export default PaginationContext