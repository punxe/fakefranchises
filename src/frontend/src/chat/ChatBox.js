import { React } from 'react';

import {ChatMessage} from './ChatMessage';

export const ChatBox = ({messages}) => {
    console.log("chat box rerender");
    return(
        <div>
            {
                messages.map(m => <ChatMessage message={m}/>)
            }
        
        </div>
    )
}