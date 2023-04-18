import {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"

export default function ProtectedRoute({children}){
    const [showChildren, setShowChildren] = useState(false)
    const navigate = useNavigate()
    const token = window.localStorage.getItem('SessionToken')

    useEffect(() => {
        if (token === null || token === undefined){
            navigate("/login")
        }
        else{
            setShowChildren(true)
        }
    },[])
    return (showChildren? children:null)
}