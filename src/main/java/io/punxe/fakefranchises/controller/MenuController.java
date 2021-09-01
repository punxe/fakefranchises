package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.WebSocketMessageTypes.RoomMessage;
import io.punxe.fakefranchises.WebSocketMessageTypes.UserListMessage;
import io.punxe.fakefranchises.WebSocketMessageTypes.UserMessage;
import io.punxe.fakefranchises.manager.GameManager;
import io.punxe.fakefranchises.model.Player;
import io.punxe.fakefranchises.model.Room;

@Controller
public class MenuController {

    @Autowired
    private GameManager gameManager;

    @Autowired
	private SimpMessageSendingOperations sendingOperations;


    /**
     * Add a new User to the server's database, then send an update to all clients
     */
    @MessageMapping("/home.newUser")
    @SendTo("/topic/users/homepage")
    public UserListMessage registerNewUser(@Payload UserMessage userMessage, SimpMessageHeaderAccessor headerAccessor){
        gameManager.addPlayer(userMessage.getSender());
        headerAccessor.getSessionAttributes().put("username", userMessage.getSender());
        return new UserListMessage("homepage", gameManager.getPlayerListByName());
    }

    
    /**
     * Recieve a Create Room message from a user, then create a room and send an update to all clients
     */
    @MessageMapping("/rooms.createRoom")
    @SendTo("/topic/rooms")
    public Room[] createRoom(@Payload RoomMessage roomMessage){
        gameManager.addRoom(roomMessage.getRoomCode(), roomMessage.getSender());
        Player player = gameManager.getPlayer(roomMessage.getSender());
        Room room = gameManager.getRoom(roomMessage.getRoomCode());
        player.setRoomCode(roomMessage.getRoomCode());
        room.addPlayer(player);
        sendingOperations.convertAndSend("/topic/users/" + roomMessage.getRoomCode(), new UserListMessage(roomMessage.getRoomCode(), room.getPlayerListByName()));
        return gameManager.getRoomList();
    }

    /**
     * Recieve a Join Room message from one user, then make that user join the room, then send an update to all clients
     */
    @MessageMapping("/rooms.joinRoom")
    @SendTo("/topic/rooms")
    public Room[] joinRoom(@Payload RoomMessage roomMessage){
        Player player = gameManager.getPlayer(roomMessage.getSender());
        Room room = gameManager.getRoom(roomMessage.getRoomCode());
        player.setRoomCode(roomMessage.getRoomCode());
        room.addPlayer(player);
        sendingOperations.convertAndSend("/topic/users/" + roomMessage.getRoomCode(), new UserListMessage(roomMessage.getRoomCode(), room.getPlayerListByName()));
        return gameManager.getRoomList();
    }

    /**
     * Recieve an Update Rooms message from one user, then send an update regarding current rooms to all clients.
     */
    @MessageMapping("/rooms.getRooms")
    @SendTo("/topic/rooms")
    public Room[] updateRoomsWhenNewUserEnters(){
        return gameManager.getRoomList();
    }
   
}
