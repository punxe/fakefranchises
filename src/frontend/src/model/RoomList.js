import { React } from 'react';

import { Room } from './Room';

import { useWebSocket, ACTIONS } from '../WebSocketContext';
import { useHistory } from "react-router-dom";



export const RoomList = () => {

    const webSocket = useWebSocket();
    const history = useHistory();

    const roomPageRoute = "/room";
  
    const createRoom = () => {
      const roomId = makeId(4);
      webSocket.dispatch({type: ACTIONS.CREATE_ROOM, payload: {code: roomId}});
      history.push(`${roomPageRoute}/${roomId}`);
    }
  
    const makeId = (length) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
     return result;
    }

    return (
        <div>
            <div>
                <h3>Rooms</h3>
            </div>
            {
                webSocket.state.rooms.map(
                    r => <Room key={r.code} room={r} />)
            }
            <div>
                <button onClick={createRoom}>Create Room</button>
            </div>

        </div>

    )
}