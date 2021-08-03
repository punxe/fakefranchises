package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.model.Action;
import io.punxe.fakefranchises.model.ActionType;
import io.punxe.fakefranchises.model.GameManager;
import io.punxe.fakefranchises.model.Message;

@Controller

public class ChatController {

    private GameManager gameManager;
    
    @Autowired
    public ChatController(GameManager gameManager){
        this.gameManager = gameManager;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chat")
    public Message manageChatMessage(@Payload Message message){
        System.out.println("chat message recieved");
            System.out.println(message.getSender() + "sent the message: " + message.getMessage());
      
        return message;
    }
}
