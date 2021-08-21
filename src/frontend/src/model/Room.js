import { React } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';
import { useHistory } from "react-router-dom";

import "./Room.css";

export const Room = ({room}) => {

    const webSocket = useWebSocket();
    const history = useHistory();

    const roomPageRoute = "/room";

    const joinRoom = () => {
        webSocket.dispatch({ type: ACTIONS.JOIN_ROOM, payload: { code: room.code } });
        history.push(`${roomPageRoute}/${room.code}`);
    }

    return(
        <div className="Room">
            <h4 className="roomCodeText">Code: {room.code}</h4> 
            <h4>Host: {room.host}</h4>
            <h4>Player Count: {Object.keys(room.players).length} </h4>
            
            {room.gameStarted ?  <h4>Game In Progress</h4>: <button onClick={joinRoom}>Join</button>}
           
        </div> 
        
    )
    
}