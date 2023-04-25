import React, {useState, useEffect, useContext} from 'react';
import NavBar from '../components/NavBar'
import ChatBody from '../components/Chat/ChatBody'
import {useParams} from 'react-router-dom'
import InfoUserContext from '../context/InfoUserContext';

export default function Chat(){
    const {usernameToChat} = useParams()
    const [conversationName, setConversationName] = useState(null)
    const {infoUser} = useContext(InfoUserContext)

    useEffect(() => {
        if(usernameToChat !== null && usernameToChat !== undefined && infoUser.info !== null){
            setConversationName(`${infoUser.info.username}__${usernameToChat}`)
        }
    },[infoUser.info, usernameToChat])

    return (
        <div>
            <NavBar/>
            <ChatBody conversationName={conversationName} setConversationName={setConversationName}/>
        </div>
    )
}