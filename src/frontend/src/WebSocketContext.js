import React, { useContext, useReducer } from 'react'

import SockJS from "sockjs-client";
import Stomp from "stompjs";


const WebSocketContext = React.createContext();

const INITIALIZE_SOCKET_URL = `${process.env.REACT_APP_API_ROOT_URL}/game`;


let username;
let stompClient;
let dispatcher;

export const ACTIONS = {
    CONNECT: 'connect',
    SEND_MESSAGE: 'sendMessage',
    RECEIVE_MESSAGE: 'receiveMessage'
}

export function useWebSocket() {
    return useContext(WebSocketContext);
}

function reducer(state, action){
    switch(action.type){
        case ACTIONS.CONNECT:
            username = action.payload.name;
            stompClient = Stomp.over(new SockJS(INITIALIZE_SOCKET_URL));
            stompClient.connect({}, onConnect, onError);
            return state;
        case ACTIONS.SEND_MESSAGE:
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({ sender: username, message: action.payload.message }));
            return state;
        case ACTIONS.RECEIVE_MESSAGE:
            return {messages: [...state.messages, action.payload.message]};
        default:
            return state;
    }
}

const onConnect = () => {
    stompClient.subscribe('/topic/public', onPublicMessageReceived);
    stompClient.subscribe('/topic/chat', onChatMessageReceived);
    stompClient.send("/app/home.newUser", {}, JSON.stringify({ type: "CONNECT", sender: "temp" }));
};
const onPublicMessageReceived = (payload) => {
    console.log("public message received");
}
const onChatMessageReceived = (payload) => {
    console.log("public message received");
    dispatcher({type: ACTIONS.RECEIVE_MESSAGE, payload: {message: JSON.parse(payload.body)}})
}
const onError = (error) => {
    console.log("error connecting to websocket");
};


export function WebSocketProvider({ children }) {

    const[state, dispatch] = useReducer(reducer, {messages: []});
    dispatcher = dispatch;
    console.log("websocketprovider rerender");

    return (
        <WebSocketContext.Provider value={{dispatch: dispatch, state: state}}>
                {children}
        </WebSocketContext.Provider>
    )
}