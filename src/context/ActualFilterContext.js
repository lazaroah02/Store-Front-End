import React, {useState} from 'react'

const ActualFilterContext = React.createContext({})

export function ActualFilterContextProvider({children}){
    const [actualFilter, setActualFilter] = useState({filter:null, value:null})
    return (<ActualFilterContext.Provider value = {{actualFilter, setActualFilter}}>
        {children}
        </ActualFilterContext.Provider>)
}

export default ActualFilterContext