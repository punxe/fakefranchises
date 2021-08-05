import { React, useRef } from 'react';


import { ChatBox } from '../chat/ChatBox';
import { OnlineUserList } from '../model/OnlineUserList';
import { useWebSocket, ACTIONS } from '../WebSocketContext';

//import "./HomePage.css";


export const HomePage = () => {
  const webSocket = useWebSocket();
  const messageToSend = useRef("input your message");

  const sendMessage = () => {
    webSocket.dispatch({type: ACTIONS.SEND_MESSAGE, payload: {message: messageToSend.current.value}});
    messageToSend.current.value = "";
  }
  return (
    <div className="HomePage">
      <h1>HomePage</h1>
      <ChatBox />
      <input ref={messageToSend} type="text" />
      <button onClick={sendMessage}>Send Message</button>
      <OnlineUserList />
    </div>
  );
}