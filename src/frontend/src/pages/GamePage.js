import { React, useState } from 'react';

import { useWebSocket, ACTIONS } from '../WebSocketContext';
import { ChatBox } from '../chat/ChatBox';
import { OnlineUserList } from '../model/OnlineUserList';

import {GameUI} from '../model/GameUI';
import { ProfileCard } from '../model/ProfileCard';

import "./GamePage.css";

export const GamePage = () => {
  const webSocket = useWebSocket();
  const [ready, setReady] = useState(false);
  const readyUp = () =>{
    
    webSocket.dispatch({type: ACTIONS.READY_UP});
    setReady(true);
  }
    return (
        <div className="GamePage">
          <div className="name">
          <ProfileCard />
          </div>
          {ready === false? <button onClick={readyUp}><b>Ready Up</b> (I'm a button! Press Me!)</button> : ( webSocket.state.gameState == null?
            <div className="readyUp">
            <h2>Waiting for other players to ready up</h2>
            </div>
            :
            <div className="gameScreen">
            <GameUI />
            </div>
          )
          }
          <div className="chat">
          <ChatBox />
          </div>
          <div className="users">
          <OnlineUserList />
          </div>

        </div>
      );
}