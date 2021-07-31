import { React } from 'react';

export const ChatMessage = ({message}) => {
    const m = JSON.parse(message);
    
    return(
        <div>
            <h4>{m.sender}: {m.message}</h4>
        </div> 

    )
}