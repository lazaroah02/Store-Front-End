import React from 'react'
import "./index.css"
import ChatHistoryCard from '../ChatHistoryCard'
import ChatForm from '../ChatForm'

export default function ChatBody(){
    return(
        <div className = "chat-body">
            <div className = "chat-history">
                <ChatHistoryCard id = {1} username = {"Lazaro"}/>
                <ChatHistoryCard id = {2} username = {"Felo"}/>
                <ChatHistoryCard id = {2} username = {"Felo"}/>
                <ChatHistoryCard id = {2} username = {"Felo"}/>
                <ChatHistoryCard id = {2} username = {"Felo"}/>
                <ChatHistoryCard id = {2} username = {"Felo"}/>
            </div>
            <ChatForm/>
        </div>
    )
}