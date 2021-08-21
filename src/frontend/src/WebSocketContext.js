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
    ROOM_LIST_UPDATE: 'roomListUpdate',
    READY_UP: 'readyUp',
    ROLL_DICE: 'rollDice',
    GAME_STATE_UPDATE: 'gameStateUpdate',
    GAME_MOVE: 'gameMove',
    CLAIM: 'claim',
    NO_CLAIM: 'noClaim',
    CHALLENGE: 'challenge',
    NO_CHALLENGE: 'noChallenge'
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
            return { username: username, chatMessages: state.chatMessages, onlineUsers: state.onlineUsers, rooms: state.rooms, gameState: state.gameState };
        case ACTIONS.USER_LIST_UPDATE:
            return { username: state.username, chatMessages: state.chatMessages, onlineUsers: action.payload.users, rooms: state.rooms, gameState: state.gameState };
        case ACTIONS.SEND_MESSAGE:
            stompClient.send(`/app/chat.sendMessage/${roomCode}`, {}, JSON.stringify({ roomCode: roomCode, sender: username, messageText: action.payload.messageText }));
            return state;
        case ACTIONS.RECEIVE_MESSAGE:
            return { username: state.username, chatMessages: [...state.chatMessages, action.payload.chatMessage], onlineUsers: state.onlineUsers, rooms: state.rooms, gameState: state.gameState };
        case ACTIONS.CREATE_ROOM:
            roomCode = action.payload.code;
            subscribeToRoom(roomCode);
            stompClient.send("/app/rooms.createRoom", {}, JSON.stringify({ sender: username, roomCode: roomCode }));
            return { username: state.username, chatMessages: [], onlineUsers: state.onlineUsers, rooms: action.payload.rooms, gameState: state.gameState };
        case ACTIONS.JOIN_ROOM:
            roomCode = action.payload.code;
            subscribeToRoom(roomCode);
            stompClient.send("/app/rooms.joinRoom", {}, JSON.stringify({ type: "CONNECT", sender: username, roomCode: roomCode }));
            return { username: state.username, chatMessages: [], onlineUsers: state.onlineUsers, rooms: action.payload.rooms, gameState: state.gameState };
        case ACTIONS.ROOM_LIST_UPDATE:
            return { username: state.username, chatMessages: state.chatMessages, onlineUsers: state.onlineUsers, rooms: action.payload.rooms, gameState: state.gameState };
        case ACTIONS.READY_UP:
            stompClient.send("/app/lobby.readyUp/" + roomCode, {}, JSON.stringify({ sender: username }));
            return state;
        case ACTIONS.ROLL_DICE:
            stompClient.send("/app/game.rollDice/" + roomCode, {}, JSON.stringify({ sender: username }));
            return state;
        case ACTIONS.GAME_STATE_UPDATE:
            return { username: state.username, chatMessages: state.chatMessages, onlineUsers: state.onlineUsers, rooms: state.rooms, gameState: action.payload.gameState };
        case ACTIONS.CLAIM:
            stompClient.send("/app/game.claim/" + roomCode, {}, JSON.stringify({ sender: username }));
            return state;
        case ACTIONS.NO_CLAIM:
            stompClient.send("/app/game.noClaim/" + roomCode, {}, JSON.stringify({ sender: username }));
            return state;
        case ACTIONS.CHALLENGE:
            stompClient.send("/app/game.challenge/" + roomCode, {}, JSON.stringify({ sender: action.payload.challenged }));
            return state;
        case ACTIONS.NO_CHALLENGE:
            stompClient.send("/app/game.noChallenge/" + roomCode, {}, JSON.stringify({ sender: action.payload.challenged }));
            return state;
        default:
            return state;
    }
}
const subscribeToRoom = (code) => {
    stompClient.subscribe(`/topic/lobby/${code}`, onLobbyMessageReceived);
    stompClient.subscribe(`/topic/chat/${code}`, onChatMessageReceived);
    stompClient.subscribe(`/topic/users/${code}`, onUserMessageReceived);
    stompClient.subscribe(`/topic/game/${roomCode}`, onGameMessageReceived);
    stompClient.subscribe(`/topic/game/move/${roomCode}`, onGameMoveMessageReceived);
}
const onLobbyMessageReceived = (payload) => {
    //lobby logic, pregame. readying up
    const payloadParsed = JSON.parse(payload.body);
    let allReady = true;
    const playerArray = payloadParsed.playerData;
    if (playerArray.length === 1) {
        allReady = false;
    } else {
        for (let i = 0; i < playerArray.length; i++) {
            if (playerArray[i].ready === false) {
                allReady = false;
            }
        }
    }
    if (allReady) {

        stompClient.send("/app/lobby.startGame/" + roomCode, {}, JSON.stringify({ sender: username }));
    }
}
const onGameMoveMessageReceived = (payload) => {
    const payloadParsed = JSON.parse(payload.body);
    dispatcher({ type: ACTIONS.GAME_MOVE, payload: { gameState: payloadParsed } });
}
const onGameMessageReceived = (payload) => {
    const payloadParsed = JSON.parse(payload.body);
    dispatcher({ type: ACTIONS.GAME_STATE_UPDATE, payload: { gameState: payloadParsed } });
}

const onConnect = () => {
    stompClient.subscribe('/topic/public', onPublicMessageReceived);
    stompClient.subscribe(`/topic/users/${roomCode}`, onUserMessageReceived);
    stompClient.subscribe(`/topic/chat/${roomCode}`, onChatMessageReceived);
    stompClient.subscribe('/topic/rooms', onRoomMessageReceived);
    stompClient.send("/app/home.newUser", {}, JSON.stringify({ sender: username }));
    stompClient.send("/app/rooms.getRooms", {}, '');
};
const onPublicMessageReceived = (payload) => {
    console.log("public message received");
}
const onUserMessageReceived = (payload) => {
    const payloadParsed = JSON.parse(payload.body);
    console.log("user message received aaa");
    if (payloadParsed.roomCode === roomCode) {
        console.log("user message received bbb");

        dispatcher({ type: ACTIONS.USER_LIST_UPDATE, payload: { users: payloadParsed.userList } });
    }
}
const onRoomMessageReceived = (payload) => {
    console.log("room message received");
    const payloadParsed = JSON.parse(payload.body);
    dispatcher({ type: ACTIONS.ROOM_LIST_UPDATE, payload: { rooms: payloadParsed } });
}
const onChatMessageReceived = (payload) => {
    const payloadParsed = JSON.parse(payload.body);

    if (payloadParsed.roomCode === roomCode) {
        console.log("chat message received in my room");
        dispatcher({ type: ACTIONS.RECEIVE_MESSAGE, payload: { chatMessage: payloadParsed } });
    }
}
const onError = (error) => {
    console.log("error connecting to websocket");
};


export function WebSocketProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, { username: null, chatMessages: [], onlineUsers: [], rooms: [], gameState: null });
    dispatcher = dispatch;

    return (
        <WebSocketContext.Provider value={{ dispatch: dispatch, state: state }}>
            {children}
        </WebSocketContext.Provider>
    )
}