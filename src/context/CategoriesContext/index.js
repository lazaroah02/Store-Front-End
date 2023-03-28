import React, {useState} from 'react'

const Context = React.createContext({})

export function CategoryContextProvider({children}){
    const [category, setCategory] = useState(null)
    return (<Context.Provider value = {{category, setCategory}}>
        {children}
        </Context.Provider>)
}

export default Context