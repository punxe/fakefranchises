import { React } from 'react';

import { useWebSocket } from '../WebSocketContext';

import './OnlineUserList.css';

export const OnlineUserList = () => {
    const webSocket = useWebSocket();
    return(
        <div className="OnlineUserList">
            <h3>ONLINE PLAYERS:</h3>
            <div className="userNameArea">
            {
            webSocket.state.onlineUsers.map(u => <h4 key={u}>{u}</h4>)
            }
            </div>
           
        </div> 
        
    )
    
}