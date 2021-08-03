import { React, useRef } from 'react';


import { ChatBox } from '../chat/ChatBox';
import { useWebSocket, ACTIONS } from '../WebSocketContext';

export const HomePage = () => {
  const webSocket = useWebSocket();
  const messageToSend = useRef("input your message");

  const sendMessage = () => {
    webSocket.dispatch({type: ACTIONS.SEND_MESSAGE, payload: {message: messageToSend.current.value}});
    messageToSend.current.value = "";
  }
  return (
    <div>
      <h1>HomePage</h1>
      <ChatBox />
      <input ref={messageToSend} type="text" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}