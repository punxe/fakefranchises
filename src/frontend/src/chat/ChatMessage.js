import { React } from 'react';

import './ChatMessage.css';

export const ChatMessage = ({message}) => {
    
    return(
        <div className = "ChatMessage">
            <h4 className = "messageText"> {message.sender}: {message.messageText}</h4>
        </div> 
        
    )
    
}