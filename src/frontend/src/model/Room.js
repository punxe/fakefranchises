import { React } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';
import { useHistory } from "react-router-dom";


export const Room = ({room}) => {

    const webSocket = useWebSocket();
    const history = useHistory();

    const roomPageRoute = "/room";

    const joinRoom = () => {
        webSocket.dispatch({ type: ACTIONS.JOIN_ROOM, payload: { code: room.code } });
        history.push(`${roomPageRoute}/${room.code}`);
    }

    return(
        <div>
            <h4>Code: {room.code} || Host: {room.host} || Player Count: {Object.keys(room.players).length} || Game In Progress: {room.gameStarted ? 'Yes' : 'No'}</h4>
            <button onClick={joinRoom}>Join</button>
        </div> 
        
    )
    
}