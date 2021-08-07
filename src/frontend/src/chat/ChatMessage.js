import { React } from 'react';



export const ChatMessage = ({message}) => {
    
    return(
        <div>
            <h4>{message.sender}: {message.messageText}</h4>
        </div> 
        
    )
    
}