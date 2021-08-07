import { React, useRef } from 'react';

import { ChatMessage } from './ChatMessage';

import { useWebSocket, ACTIONS } from '../WebSocketContext';




export const ChatBox = () => {

    const webSocket = useWebSocket();
    const messageToSend = useRef("input your message");

    const sendMessage = () => {
        webSocket.dispatch({ type: ACTIONS.SEND_MESSAGE, payload: { data: messageToSend.current.value } });
        messageToSend.current.value = "";
    }
    return (
        <div>
            <div>
                <h3>Chat</h3>
            </div>
            {
                webSocket.state.messages.map(
                    m => <ChatMessage key={`${m.sender} ${m.data}`} message={m} />)
            }
            <div>
                <input ref={messageToSend} type="text" />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </div>

    )
}