import React, {useState, useEffect, useContext} from 'react'
import "./index.css"
import ChatHistoryCard from '../ChatHistoryCard'
import ChatForm from '../ChatForm'
import { getConversationsOfUser } from '../../../services/chat/getConversationsOfUser'
import InfoUserContext from '../../../context/InfoUserContext'
import StartAChatInformation from '../StartAChatInformation'

export default function ChatBody({conversationName, setConversationName}){
    const [conversationHistory, setConversationHistory] = useState(null)
    const {infoUser} = useContext(InfoUserContext)

    useEffect(() => {
        if(infoUser !== null){
            getConversationsOfUser(infoUser.token)
            .then(data => setConversationHistory(data))
        }
    },[])

   
    return(
        <div className = "chat-body">
            <StartAChatInformation/>
            <div className = "chat-history">
                {conversationHistory !== null?conversationHistory.map(conversation => 
                    <ChatHistoryCard key = {conversation.id} conversationName={conversation.name} setConversationName={setConversationName}/>
                ):null}
            </div>
            {conversationName === null?
            <div className = "tus-mensajes-apareceran-aqui container">Tus mensajes apareceran aqui</div>
            :
            <ChatForm conversationName={conversationName}/>
            }
        </div>
    )
}