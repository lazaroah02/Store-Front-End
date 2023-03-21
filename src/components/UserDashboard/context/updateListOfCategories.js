import React, {useState} from 'react'

const Context = React.createContext({})

export function UpdateListOfCategoriesProvider({children}){
    const [updateCategories, setUpdateCategories] = useState(0)
    return (<Context.Provider value = {{updateCategories, setUpdateCategories}}>
        {children}
        </Context.Provider>)
}

export default Context