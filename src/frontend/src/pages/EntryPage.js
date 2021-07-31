import { React, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useWebSocketObject } from '../WebSocketContext';

export const EntryPage = () => {

  const webSocketObject = useWebSocketObject();

  const nameInput = useRef("username");
  console.log("app loaded");

  const history = useHistory();

  const homePageRoute = "/home";

  const connect = () => {
    webSocketObject.initializeWebSocket(nameInput.current.value);
    history.push(homePageRoute);
  }


  return (
    <div>
      <input ref={nameInput} type="text" />
      <button onClick={connect}>Enter Game</button>
    </div>
  );
}