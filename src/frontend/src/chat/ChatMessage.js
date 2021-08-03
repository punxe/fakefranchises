import { React } from 'react';



export const ChatMessage = ({message}) => {
    
    return(
        <div>
            <h4>{message.sender}: {message.message}</h4>
        </div> 
        
    )
    
}