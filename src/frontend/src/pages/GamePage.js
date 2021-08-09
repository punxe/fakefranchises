import { React, useState } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';
import { ChatBox } from '../chat/ChatBox';
import { OnlineUserList } from '../model/OnlineUserList';

import {GameUI} from '../model/GameUI';
import { ProfileCard } from '../model/ProfileCard';

export const GamePage = () => {
  const webSocket = useWebSocket();
  const [ready, setReady] = useState(false);
  const readyUp = () =>{
    
    webSocket.dispatch({type: ACTIONS.READY_UP});
    setReady(true);
  }
    return (
        <div className="GamePage">
          <ProfileCard />
          {ready == false? <button onClick={readyUp}>Ready Up</button> : ( webSocket.state.gameState == null?
            <h2>Waiting for other players to ready up</h2>
            :
            <GameUI />
          )
          }
          <ChatBox />
          <OnlineUserList />

        </div>
      );
}