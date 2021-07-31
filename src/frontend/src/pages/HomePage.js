import { React, useRef, useState } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import { ChatMessage } from '../chat/ChatMessage';
import { ChatBox } from '../chat/ChatBox';
import { useWebSocketObject } from '../WebSocketContext';

export const HomePage = () => {
  const webSocketObject = useWebSocketObject();
  const messageToSend = useRef("input your message");

  const sendMessage = () => {
    webSocketObject.sendChatMessage(messageToSend.current.value);
    messageToSend.current.value = "";
  }

  console.log("size: " + webSocketObject.chatMessages.size);
  return (
    <div>
      <h1>HomePage</h1>
      <ChatBox messages={webSocketObject.chatMessages} />
      <input ref={messageToSend} type="text" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}