import { React } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';
import { ChatBox } from '../chat/ChatBox';
import { OnlineUserList } from '../model/OnlineUserList';

export const GamePage = () => {
  const webSocket = useWebSocket();
  
  const readyUp = () =>{
    
    webSocket.dispatch({type: ACTIONS.READY_UP});
  }
    return (
        <div className="GamePage">
          <button onClick={readyUp}>Ready Up</button>
          
          <ChatBox />
          <OnlineUserList />

        </div>
      );
}