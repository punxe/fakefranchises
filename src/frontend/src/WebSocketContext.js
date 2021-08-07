import React, { useContext, useReducer } from 'react'

import SockJS from "sockjs-client";
import Stomp from "stompjs";


const WebSocketContext = React.createContext();

const INITIALIZE_SOCKET_URL = `${process.env.REACT_APP_API_ROOT_URL}/game`;


let username;
let stompClient;
let dispatcher;
let roomCode = "homepage";

export const ACTIONS = {
    CONNECT: 'connect',
    SEND_MESSAGE: 'sendMessage',
    RECEIVE_MESSAGE: 'receiveMessage',
    USER_LIST_UPDATE: 'userListUpdate',
    CREATE_ROOM: 'newRoom',
    JOIN_ROOM: 'joinRoom',
    ROOM_LIST_UPDATE: 'roomListUpdate'
}

export function useWebSocket() {
    return useContext(WebSocketContext);
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.CONNECT:
            username = action.payload.name;
            stompClient = Stomp.over(new SockJS(INITIALIZE_SOCKET_URL));
            stompClient.connect({}, onConnect, onError);
            return state;
        case ACTIONS.USER_LIST_UPDATE:
            return { messages: state.messages, onlineUsers: action.payload.users, rooms: state.rooms };
        case ACTIONS.SEND_MESSAGE:
            stompClient.send(`/app/chat.sendMessage/${roomCode}`, {}, JSON.stringify({ sender: username, data: action.payload.data, roomCode: roomCode }));
            return state;
        case ACTIONS.RECEIVE_MESSAGE:
            return { messages: [...state.messages, action.payload.message], onlineUsers: state.onlineUsers, rooms: state.rooms };
        case ACTIONS.CREATE_ROOM:
            roomCode = action.payload.code;
            subscribeToRoom(roomCode);
            stompClient.send("/app/rooms.createRoom", {}, JSON.stringify({ type: "CONNECT", sender: username, roomCode: roomCode }));
            return { messages: [], onlineUsers: state.onlineUsers, rooms: action.payload.rooms};
        case ACTIONS.JOIN_ROOM:
            roomCode = action.payload.code;
            subscribeToRoom(roomCode);
            stompClient.send("/app/rooms.joinRoom", {}, JSON.stringify({ type: "CONNECT", sender: username, roomCode: roomCode }));
            return { messages: [], onlineUsers: state.onlineUsers, rooms: action.payload.rooms};
        case ACTIONS.ROOM_LIST_UPDATE:
            return { messages: state.messages, onlineUsers: state.onlineUsers, rooms: action.payload.rooms };
        default:
            return state;
    }
}
const subscribeToRoom = (code) => {
    stompClient.subscribe(`/topic/${code}`, onGameMessageReceived);
    stompClient.subscribe(`/topic/chat/${code}`, onChatMessageReceived);
    stompClient.subscribe(`/topic/users/${code}`, onUserMessageReceived);
}
const onGameMessageReceived = () => {
    //game logic
}
const onConnect = () => {
    stompClient.subscribe('/topic/public', onPublicMessageReceived);
    stompClient.subscribe(`/topic/users/${roomCode}`, onUserMessageReceived);
    stompClient.subscribe(`/topic/chat/${roomCode}`, onChatMessageReceived);
    stompClient.subscribe('/topic/rooms', onRoomMessageReceived);
    stompClient.send("/app/home.newUser", {}, JSON.stringify({ type: "CONNECT", sender: username, roomCode: roomCode }));
    stompClient.send("/app/rooms.getRooms", {}, '');
};
const onPublicMessageReceived = (payload) => {
    console.log("public message received");
}
const onUserMessageReceived = (payload) => {
    const payloadParsed = JSON.parse(payload.body);
    console.log("user message received aaa");
    //if(payloadParsed.roomCode == roomCode){
    console.log("user message received");
    
    dispatcher({ type: ACTIONS.USER_LIST_UPDATE, payload: { users: payloadParsed } });
    //}
}
const onRoomMessageReceived = (payload) => {
    console.log("room message received");
    const payloadParsed = JSON.parse(payload.body);
    dispatcher({ type: ACTIONS.ROOM_LIST_UPDATE, payload: { rooms: payloadParsed } });
}
const onChatMessageReceived = (payload) => {
    const payloadParsed = JSON.parse(payload.body);
        
    if(payloadParsed.roomCode == roomCode){
        console.log("chat message received in my room");
        dispatcher({ type: ACTIONS.RECEIVE_MESSAGE, payload: { message: payloadParsed } });
    }
}
const onError = (error) => {
    console.log("error connecting to websocket");
};


export function WebSocketProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, { messages: [], onlineUsers: [], rooms: [] });
    dispatcher = dispatch;

    return (
        <WebSocketContext.Provider value={{ dispatch: dispatch, state: state }}>
            {children}
        </WebSocketContext.Provider>
    )
}