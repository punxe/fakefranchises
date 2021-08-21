import { React } from 'react';

import { useWebSocket } from '../WebSocketContext';




export const ProfileCard = () => {

    const webSocket = useWebSocket();


    return (
        <div>
                <h3>Your Name: {webSocket.state.username}</h3>
        </div>
    )
}