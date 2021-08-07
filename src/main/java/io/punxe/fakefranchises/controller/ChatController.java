package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.model.Action;
import io.punxe.fakefranchises.model.ActionType;
import io.punxe.fakefranchises.model.GameManager;

@Controller

public class ChatController {

    private GameManager gameManager;
    
    @Autowired
    public ChatController(GameManager gameManager){
        this.gameManager = gameManager;
    }

    @MessageMapping("/chat.sendMessage/{room}")
    @SendTo("/topic/chat/{room}")
    public Action manageChatMessage(@DestinationVariable String room, @Payload Action action){      
        return action;
    }
}
