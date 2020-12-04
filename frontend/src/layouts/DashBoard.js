import React from 'react'
import {CTX} from './Store'
import '../App.css'


export default function DashBoard() {

    const [Chats] = React.useContext(CTX)
    const topic = Object.keys(Chats)

    return (
        <>
            <div className="main" id="chatbox">
                <div className="chat-panel" >
                    <ul id="chat">
                        {
                            Chats[topic].map((chat, i) => {                        
                                if (chat.from === 'bot') {
                                    return (
                                        <li key={i}>
                                            <div className="row no-gutters">
                                                <div className="col-md-3">
                                                    <div className="chat-bubble chat-bubble-left chat-bubble--left">
                                                        {chat.msg}
                                                    </div>
                                                </div>
                                            </div>  
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={i}>
                                            <div className="row no-gutters">
                                                <div className="col-md-3 offset-md-9">
                                                    <div className="chat-bubble chat-bubble-right chat-bubble--right">
                                                        {chat.msg}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>   
                </div>
            </div>
        </>
    )
}