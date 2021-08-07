package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.WebSocketMessageTypes.GameActionMessage;
import io.punxe.fakefranchises.manager.GameManager;
import io.punxe.fakefranchises.WebSocketMessageTypes.ActionType;

@Controller
public class GameController {

    private GameManager gameManager;
    
    @Autowired
    public GameController(GameManager gameManager){
        this.gameManager = gameManager;
    }

    @MessageMapping("/game.action")
    @SendTo("/topic/public")
    public GameActionMessage sendAction(@Payload GameActionMessage action){

        return action;
    }
   
}
