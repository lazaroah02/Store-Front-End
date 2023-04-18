import React, {useState, useEffect, useContext} from 'react';
import "./index.css"
import ChatHistoryCard from '../ChatHistoryCard';
import useWebSocket, { ReadyState } from "react-use-websocket";
import ShowMessageBox from '../ShowMessageBox';
import {CHAT_URL} from '../../../settings'
import InfoUserContext from '../../../context/InfoUserContext';
export default function ChatForm(){
    const [message, setMessage] = useState("")
    const [messagesHistory, setMessagesHistory] = useState([])
    const {infoUser} = useContext(InfoUserContext)

    //chat
    const { readyState, sendJsonMessage } = useWebSocket(CHAT_URL, {
        onOpen: () => {
        },
        onClose: () => {
        },
        onMessage:(e)=>{
            let data = JSON.parse(e.data)
            if (data.type === 'chat_message_echo'){
                setMessagesHistory(messagesHistory.concat(data))
            }
        }
    });

    //read the state of the connection with the server
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated"
      }[readyState];

    useEffect(() => {
        //console.log(connectionStatus)
    },[connectionStatus])
      
    //function to handle send message  
    function handleSendMessage(e){
        e.preventDefault();
        if(infoUser !== null && infoUser !== undefined){
            sendJsonMessage({
                type: "chat_message",
                message: message,
                user:infoUser.username
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
                    <div className = "user-info"><ChatHistoryCard id = {2} username = {"Juan"}/></div>
                </div>
            </div>
            <div className = "card-body messages-container" >
               {messagesHistory.map((mes, index) => 
                <ShowMessageBox key = {index} message = {mes.message} user = {mes.user} infoUser = {infoUser}/>
               )}
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