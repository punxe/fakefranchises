import { React, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const EntryPage = ({stompClient}) => {

  const nameInput = useRef("username");
  console.log("app loaded");

  const history = useHistory();

  const SOCKET_URL = `${process.env.REACT_APP_API_ROOT_URL}/game`;
  console.log(SOCKET_URL);

  const homePageRoute = "/home";

  const connect = () => {
    stompClient = Stomp.over(new SockJS(SOCKET_URL));
    stompClient.connect({}, onConnect, onError);
    history.push(homePageRoute);
  }


  const onConnect = () => {
    stompClient.subscribe('/topic/public', onPublicMessageReceived);
    
    stompClient.send("/app/home.newUser", {}, JSON.stringify({type: "CONNECT", sender: "temp"}));
  }

  const onPublicMessageReceived = () => {
    console.log("public message received");
  }

  const onError = () => {
    console.log("error occured while connecting");
  }
  return (
    <div className={"HomePage"}>
      <input ref={nameInput} type="text" />
      <button onClick={connect}>Enter Game</button>
    </div>
  );
}