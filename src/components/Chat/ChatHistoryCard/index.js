import React, {useEffect, useState, useContext} from 'react';
import './index.css'
import ProfileLogo from "../../../assets/navBarIcons/logo-profile.svg"
import InfoUserContext from '../../../context/InfoUserContext';

export default function ChatHistoryCard({conversationName, setConversationName}){
    const [name, setName] = useState(null)
    const {infoUser} = useContext(InfoUserContext)

    useEffect(() => {
        if(infoUser.info !== null && conversationName !== undefined && conversationName !== null){
            let users = conversationName.split("__")
            let from_user = users[0]
            let to_user = users[1]
            if (from_user !== infoUser.info.username) setName(from_user)
            else setName(to_user)
        }
    },[conversationName, infoUser.info])

    return(
        <section className = "history-card-container" onClick={() => setConversationName(conversationName)}>
            <div>
                <img src = {ProfileLogo} alt = {"user"}/>
            </div>
            <div className = "username-container">
                {name}
            </div>
        </section>
    )
}