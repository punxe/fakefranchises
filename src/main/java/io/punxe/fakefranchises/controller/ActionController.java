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

@Controller
public class ActionController {

    private GameManager gameManager;
    
    @Autowired
    public ActionController(GameManager gameManager){
        this.gameManager = gameManager;
    }

    @MessageMapping("/game.action")
    @SendTo("/topic/public")
    public Action sendAction(@Payload Action action){

        return action;
    }
    @MessageMapping("/home.newUser")
    @SendTo("/topic/public")
    public String[] registerNewUser(@Payload Action action, SimpMessageHeaderAccessor headerAccessor){
        gameManager.addPlayer(action.getSender());
        headerAccessor.getSessionAttributes().put("username", action.getSender());
        return gameManager.getPlayerListByName();
    }
   
}
