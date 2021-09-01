package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.WebSocketMessageTypes.ChatMessage;
import io.punxe.fakefranchises.manager.GameManager;

@Controller

public class ChatController {
    
    private GameManager gameManager;
    
    /**
     * Dependency injection on gameManager.
     */
    @Autowired
    public ChatController(GameManager gameManager){
        this.gameManager = gameManager;
    }

    /**
     * Recieve a Chat Message from one user, then send an update to the chatroom of the corresponding user
     */
    @MessageMapping("/chat.sendMessage/{room}")
    @SendTo("/topic/chat/{room}")
    public ChatMessage manageChatMessage(@DestinationVariable String room, @Payload ChatMessage chatMessage){      
        return chatMessage;
    }
}
