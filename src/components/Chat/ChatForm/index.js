import React, {useState, useContext, useEffect} from 'react';
import "./index.css"
import useWebSocket, { ReadyState } from "react-use-websocket";
import ShowMessageBox from '../ShowMessageBox';
import {CHAT_URL} from '../../../settings'
import InfoUserContext from '../../../context/InfoUserContext';
import ProgresGif from '../../ProgresGif'
import {useIsNear} from '../../../customHooks/useIsNear'

export default function ChatForm({conversationName}){
    const [message, setMessage] = useState("")
    const [messagesHistory, setMessagesHistory] = useState([])
    const {infoUser} = useContext(InfoUserContext)
    const [name, setName] = useState("")
    const [pagination, setPagination] = useState([51, 101])
    const {isNear, reference, setStopObserving, rootReference} = useIsNear("150px 0px 150px 0px")
    const [scrollStyle, setScrollStyle] = useState("card-body messages-container")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(infoUser.info !== null && conversationName !== undefined && conversationName !== null){
            let users = conversationName.split("__")
            let from_user = users[0]
            let to_user = users[1]
            if (from_user !== infoUser.info.username) setName(from_user)
            else setName(to_user)
        }
        setPagination([51, 101])
        setStopObserving(false)
        setScrollStyle("card-body messages-container")
    },[conversationName])
    
    //useEffect para que cuando isNear sea true haga la siguiente paginacion
    
    useEffect(() => {
        if(isNear && messagesHistory.length > 0){
            setLoading(true)
            sendJsonMessage({
                type:"next_page_of_messages",
                desde:pagination[0],
                hasta:pagination[1],
            })
            setPagination([pagination[1] + 1, pagination[1] + 51])
            setLoading(true)
        }
    },[isNear])  
    
    //chat
    const { readyState, sendJsonMessage } = useWebSocket(`${CHAT_URL}/${conversationName}/`, {
        queryParams:{
            token: infoUser.token
        },
        onOpen: () => {
        },
        onClose: () => {
        },
        onMessage:(e)=>{
            let data = JSON.parse(e.data)
            switch(data.type) {
                case "chat_message_echo":
                    let messageContent = JSON.parse(data.message)
                    setMessagesHistory(messagesHistory.concat(messageContent))
                    setScrollStyle("card-body messages-container")
                    break
                case "next_page_of_messages":
                    if(data.messages.length === 0){
                        setStopObserving(true)
                        setLoading(false)
                    }
                    else {
                        setMessagesHistory((data.messages).reverse().concat(messagesHistory))
                        setLoading(false)
                    } 
                    break  
                case "first_page_of_messages":
                    if(data.messages.length === 0){
                        setStopObserving(true)
                        setLoading(false)
                    }
                    else {
                        setMessagesHistory((data.messages).reverse()) 
                        setLoading(false)
                    }
                    break      
                default:
                         
            }
        }
    });

    //read the state of the connection with the server
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Conectado",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated"
      }[readyState];
      
    //function to handle send message  
    function handleSendMessage(e){
        e.preventDefault();
        if(infoUser !== null && infoUser !== undefined){
            sendJsonMessage({
                type: "chat_message",
                user:infoUser.info.username,
                message: message,
            })
            setMessage("")
        }
        else{
            alert("Debes estar authenticado para usar el chat")
        }
    }

    return (
        <div className = "card send-message-form">
            <div className = "card-header">
                <div>
                    <div className = "user-info">{name}</div>
                </div>
            </div>
            <div className = {scrollStyle} onScroll={() => setScrollStyle("card-body messages-container-scrolled")} ref = {rootReference}>
                <p ref = {reference}></p>
                {connectionStatus === "Connecting" || loading?<ProgresGif/>:null}
               {messagesHistory.map((mes) =>
                <ShowMessageBox key = {mes.id} message = {mes.content} from_user = {mes.from_user} timestamp={mes.timestamp}/>
               )}
               <div><div>.</div></div>
            </div>
            <div className = "card-footer">
                <form className = "form chat-form" onSubmit={(e) => handleSendMessage(e)}>
                    <input className = "input-message" value = {message} onChange={(e) => setMessage(e.target.value)}/>
                    <input type = "submit" className = "btn btn-primary"/>
                </form>
            </div>
        </div>
    )
}