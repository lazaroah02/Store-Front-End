import React from 'react';
import "./index.css"
import ChatHistoryCard from '../ChatHistoryCard';

export default function ChatForm(){
    return (
        <div className = "card send-message-form">
            <div className = "card-header">
                <div>
                    <div className = "user-info"><ChatHistoryCard id = {2} username = {"Juan"}/></div>
                </div>
            </div>
            <div className = "card-body">

            </div>
            <div className = "card-footer">
                <form className = "form chat-form">
                    <input className = "input-message"/>
                    <input type = "submit" className = "btn btn-primary"/>
                </form>
            </div>
        </div>
    )
}