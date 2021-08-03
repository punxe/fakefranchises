import { React } from 'react';

import {ChatMessage} from './ChatMessage';

import { useWebSocket } from '../WebSocketContext';

export const ChatBox = () => {
    const webSocket = useWebSocket();
    return(
        <div>
            {
                webSocket.state.messages.map(
                    m => <ChatMessage key={`${m.sender} ${m.message}`} message={m}/>)
                
            }
        </div>
        
    )
}