import React from 'react';
import './index.css'
import ProfileLogo from "../../../assets/navBarIcons/logo-profile.svg"

export default function ChatHistoryCard({id, username}){
    return(
        <section className = "history-card-container">
            <div>
                <img src = {ProfileLogo} alt = {"user"}/>
            </div>
            <div>
                {username}
            </div>
        </section>
    )
}