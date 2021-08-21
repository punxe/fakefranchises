import { React, useRef } from 'react';

import { ChatMessage } from './ChatMessage';

import { useWebSocket, ACTIONS } from '../WebSocketContext';

import './ChatBox.css';


export const ChatBox = () => {

    const webSocket = useWebSocket();
    const messageToSend = useRef("input your message");

    const sendMessage = () => {
        if(messageToSend.current.value.length < 20) {
            webSocket.dispatch({ type: ACTIONS.SEND_MESSAGE, payload: { messageText: messageToSend.current.value } });
            messageToSend.current.value = "";
        }else{
            messageToSend.current.value = "max message length is 20 characters";
        }
        
    }
    return (
        <div className='ChatBox'>

            <h3>Chat</h3>
            <div className='chatMessageArea'>

                {
                    webSocket.state.chatMessages.map(
                        m => <ChatMessage key={`${m.sender} ${m.messageText}`} message={m} />)
                }

            </div>
            <div>
                <input ref={messageToSend} type="text" />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>

    )
}