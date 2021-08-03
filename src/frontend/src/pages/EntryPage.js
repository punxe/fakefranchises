import { React, useRef } from 'react';
import { useHistory } from "react-router-dom";

import { useWebSocket, ACTIONS } from '../WebSocketContext';

export const EntryPage = () => {

  const webSocket = useWebSocket();

  const nameInput = useRef("username");
  console.log("app loaded");

  const history = useHistory();

  const homePageRoute = "/home";

  const connect = () => {
    webSocket.dispatch({type:ACTIONS.CONNECT, payload: {name:nameInput.current.value}});
    history.push(homePageRoute);
  }


  return (
    <div>
      <input ref={nameInput} type="text" />
      <button onClick={connect}>Enter Game</button>
    </div>
  );
}