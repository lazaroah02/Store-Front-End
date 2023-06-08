import React, {useState} from 'react'
import ShowFloatMessage from '../components/ShowFloatMessage';

export function useShowFloatMessage(){
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState({title:"", message:"", type:"success"})

    function showFloatMessage({title = "!", message = "", type = "success"}){
        setMessage({title:title, message:message, type:type})
        setShow(true)
    }
    const FloatMessage = <ShowFloatMessage show = {show} setShow = {setShow}title = {message.title} message = {message.message} type = {message.type}/>

    return {showFloatMessage, FloatMessage}
}