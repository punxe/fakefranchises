import { React } from 'react';

import { useWebSocket } from '../WebSocketContext';

export const OnlineUserList = () => {
    const webSocket = useWebSocket();
    return(
        <div>
            <h3>ONLINE PLAYERS:</h3>
            {
            webSocket.state.onlineUsers.map(u => <h4>{u}</h4>)
            }    

           
        </div> 
        
    )
    
}