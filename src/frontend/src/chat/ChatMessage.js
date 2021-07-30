import { React } from 'react';

export const ChatMessage = ({sender, message}) => {
    return(
        <div>
            <h1>{sender}: {message}</h1>
        </div> 

    )
}