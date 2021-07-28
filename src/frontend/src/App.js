import { React, useRef }  from 'react';
import './App.css';

import SockJS from "sockjs-client";
import Stomp from "stompjs";

function App() {

  const nameInput = useRef();
  console.log("app loaded");

  const SOCKET_URL = `${process.env.REACT_APP_API_ROOT_URL}/game`;
  console.log(SOCKET_URL);

  let stompClient = null;
  const userEnter = () => {
    console.log("this thing is getting run 1");
    stompClient = Stomp.over(new SockJS(SOCKET_URL));
    stompClient.connect({}, onConnected, onError);
    console.log("this thing is getting run 2");
  }
  const onConnected = () => {
    console.log("connected successfully");
  }
  const onError = () => {
    console.log("error occured while connecting");
  }

  return (
    <div className="App">
      <input ref = {nameInput} type="text" />
      <button onClick={userEnter}>Enter</button>

    </div>
  );
}

export default App;
