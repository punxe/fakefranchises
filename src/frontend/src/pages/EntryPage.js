import { React, useRef } from 'react';
import './App.css';
import { Router, Route, Switch } from "react-router-dom";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const EntryPage = ({stompClient}) => {

  const nameInput = useRef("username");
  console.log("app loaded");

  const SOCKET_URL = `${process.env.REACT_APP_API_ROOT_URL}/game`;
  console.log(SOCKET_URL);


  const connect = () => {
    setStompClient(Stomp.over(new SockJS(SOCKET_URL)));
    stompClient.connect({}, onConnect, onError);
  }


  const onConnect = () => {
    stompClient.subscribe('/topic/public', onMessageReceived);
    
    stompClient.send("/app/chat.newUser")
  }
  const onError = () => {
    console.log("error occured while connecting");
  }
  return (
    <div className={HomePage}>
      <input ref={nameInput} type="text" />
      <button onClick={connect}>Enter Game</button>
    </div>
  );
}