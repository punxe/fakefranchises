import React, { useContext, useState} from 'react'

import SockJS from "sockjs-client";
import Stomp from "stompjs";


const WebSocketObjectContext = React.createContext();

const INITIALIZE_SOCKET_URL = `${process.env.REACT_APP_API_ROOT_URL}/game`;

let WebSocketObject = {
    username: "tempusername",
    stompClient: "null",
    chatMessages: [],
    initializeWebSocket: (name) => {
        WebSocketObject.username = name;
        WebSocketObject.stompClient = Stomp.over(new SockJS(INITIALIZE_SOCKET_URL));
        WebSocketObject.stompClient.connect({}, WebSocketObject.onConnect, WebSocketObject.onError);
    },
    onConnect: () => {
        WebSocketObject.stompClient.subscribe('/topic/public', WebSocketObject.onPublicMessageReceived);
        WebSocketObject.stompClient.subscribe('/topic/chat', WebSocketObject.onChatMessageReceived);
        WebSocketObject.stompClient.send("/app/home.newUser", {}, JSON.stringify({type: "CONNECT", sender: "temp"}));
    },
    onError: () => {
        console.log("error initializing websocket");
    },
    onPublicMessageReceived: () => {
        console.log("public message received");
    },
    onChatMessageReceived: (payload) => {
        WebSocketObject.chatMessages.push(payload);
    },
    sendChatMessage: (m) => {
        //console.log("run once");
        WebSocketObject.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({sender: WebSocketObject.username, message: m}));
    }
};






export function useWebSocketObject(){
    return useContext(WebSocketObjectContext);
}

export function WebSocketProvider ({children}) {
    const [webSocketObject, setWebSocketObject] = useState(WebSocketObject);
    const [webSocketObjectMessagesLength, setWebSocketObjectMessagesLength] = useState(WebSocketObject.chatMessages.length);
    console.log("websocketprovider rerender");

    return(
        <WebSocketObjectContext.Provider value={webSocketObject}>
            {children}
        </WebSocketObjectContext.Provider>
    )
}