import React, {useState} from 'react'

const Context = React.createContext({})

export function ShowCreateCategoryModalContextProvider({children}){
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false)
    return (<Context.Provider value = {{showCreateCategoryModal, setShowCreateCategoryModal}}>
        {children}
        </Context.Provider>)
}

export default Context