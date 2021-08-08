package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.WebSocketMessageTypes.GameActionMessage;
import io.punxe.fakefranchises.WebSocketMessageTypes.PlayerDataMessage;
import io.punxe.fakefranchises.WebSocketMessageTypes.UserMessage;
import io.punxe.fakefranchises.manager.GameManager;
import io.punxe.fakefranchises.model.Player;
import io.punxe.fakefranchises.WebSocketMessageTypes.ActionType;

@Controller
public class GameController {

    @Autowired
    private GameManager gameManager;

    @Autowired
	private SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/game.action/{room}")
    @SendTo("/topic/game/{room}")
    public GameActionMessage sendAction(@Payload GameActionMessage action){

        return action;
    }

    @MessageMapping("/lobby.readyUp/{room}")
    @SendTo("/topic/lobby/{room}")
    public PlayerDataMessage readyUp(@DestinationVariable String room, @Payload UserMessage userMessage){
        gameManager.getPlayer(userMessage.getSender()).setReady(true);
        return new PlayerDataMessage(room, gameManager.getRoom(gameManager.getPlayer(userMessage.getSender()).getRoomCode()).getPlayerListByPlayer());
    }
   
    @MessageMapping("/lobby.startGame/{room}")
    public void startGame(@DestinationVariable String room, @Payload UserMessage userMessage){
        if(gameManager.getRoom(room).getHost().equals(userMessage.getSender())){
            
            gameManager.getRoom(room).startGame();
            sendingOperations.convertAndSend("/topic/rooms", gameManager.getRoomList());
        }
    }
}
