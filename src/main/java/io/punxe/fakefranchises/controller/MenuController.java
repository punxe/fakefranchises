package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.model.Action;
import io.punxe.fakefranchises.model.ActionType;
import io.punxe.fakefranchises.model.GameManager;
import io.punxe.fakefranchises.model.Room;

@Controller
public class MenuController {

    private GameManager gameManager;
    
    @Autowired
    public MenuController(GameManager gameManager){
        this.gameManager = gameManager;
    }

    @MessageMapping("/home.newUser")
    @SendTo("/topic/users")
    public String[] registerNewUser(@Payload Action action, SimpMessageHeaderAccessor headerAccessor){
        gameManager.addPlayer(action.getSender());
        headerAccessor.getSessionAttributes().put("username", action.getSender());
        return gameManager.getPlayerListByName();
    }

    @MessageMapping("/rooms.getRooms")
    @SendTo("/topic/rooms")
    public Room[] updateRoomsWhenNewUserEnters(){
        return gameManager.getRoomList();
    }

    @MessageMapping("/rooms.createRoom")
    @SendTo("/topic/rooms")
    public Room[] createRoom(@Payload Action action){
        gameManager.getPlayer(action.getSender()).setRoomCode(action.getRoomCode());
        gameManager.addRoom(action.getRoomCode(), action.getSender());
        gameManager.getRoom(action.getRoomCode()).addPlayer(gameManager.getPlayer(action.getSender()));
        return gameManager.getRoomList();
    }

    @MessageMapping("/rooms.joinRoom")
    @SendTo("/topic/rooms")
    public Room[] joinRoom(@Payload Action action){
        gameManager.getPlayer(action.getSender()).setRoomCode(action.getRoomCode());
        gameManager.getRoom(action.getRoomCode()).addPlayer(gameManager.getPlayer(action.getSender()));
        return gameManager.getRoomList();
    }
   
}
