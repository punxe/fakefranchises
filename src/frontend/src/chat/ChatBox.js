import { React } from 'react';

import {ChatMessage} from './ChatMessage';

export const ChatBox = ({messages}) => {
    return(
        <div>
            {messages.map(m> <ChatMessage sender={m.sender} message={m.message}/>)}
        </div> 

    )
}