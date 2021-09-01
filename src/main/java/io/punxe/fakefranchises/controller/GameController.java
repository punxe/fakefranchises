package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import io.punxe.fakefranchises.WebSocketMessageTypes.GameActionMessage;
import io.punxe.fakefranchises.WebSocketMessageTypes.PlayerDataMessage;
import io.punxe.fakefranchises.WebSocketMessageTypes.UserMessage;
import io.punxe.fakefranchises.manager.GameManager;


@Controller
public class GameController {

    @Autowired
    private GameManager gameManager;
    @Autowired
	private SimpMessageSendingOperations sendingOperations;

    /**
     * Recieve an Action message from one user, then send an update to all clients
     */
    @MessageMapping("/game.action/{room}")
    @SendTo("/topic/game/{room}")
    public GameActionMessage sendAction(@Payload GameActionMessage action){
        return action;
    }
    /**
     * Recieve a Ready Up message from one user, then send an update to all clients
     */
    @MessageMapping("/lobby.readyUp/{room}")
    @SendTo("/topic/lobby/{room}")
    public PlayerDataMessage readyUp(@DestinationVariable String room, @Payload UserMessage userMessage){
        gameManager.getPlayer(userMessage.getSender()).setReady(true);
        return new PlayerDataMessage(room, gameManager.getRoom(gameManager.getPlayer(userMessage.getSender()).getRoomCode()).getPlayerListByPlayer());
    }
    /**
     * Recieve a Start Game message from one user, then start the game and send an update to all clients
     */
    @MessageMapping("/lobby.startGame/{room}")
    public void startGame(@DestinationVariable String room, @Payload UserMessage userMessage){
        if(gameManager.getRoom(room).getHost().equals(userMessage.getSender())){
            
            gameManager.getRoom(room).startGame();
            sendingOperations.convertAndSend("/topic/rooms", gameManager.getRoomList());
            sendingOperations.convertAndSend("/topic/game/" + room, gameManager.getRoom(room).getGame());
        }
    }

    /**
     * Recieve a Roll Dice message from one user, then roll the dice and send an update to all clients
     */
    @MessageMapping("/game.rollDice/{room}")
    public void rollDice(@DestinationVariable String room, @Payload UserMessage userMessage){
        gameManager.getRoom(room).rollDice(userMessage.getSender());
        gameManager.getRoom(room).getGame().refreshPlayerClaims();
        gameManager.getRoom(room).getGame().resetChallengeResults();
        sendingOperations.convertAndSend("/topic/game/" + room, gameManager.getRoom(room).getGame());
    }

    /**
     * Recieve a Did Claim message from one user, then set the claim as true and send an update to all clients
     */
    @MessageMapping("/game.claim/{room}")
    public void claim(@DestinationVariable String room, @Payload UserMessage userMessage){
        gameManager.getRoom(room).getGame().setPlayerClaim(userMessage.getSender(), "true");
        sendingOperations.convertAndSend("/topic/game/" + room, gameManager.getRoom(room).getGame());
    }

    /**
     * Recieve a Did Not Claim message from one user, then set the claim as false and send an update to all clients
     */
    @MessageMapping("/game.noClaim/{room}")
    public void noClaim(@DestinationVariable String room, @Payload UserMessage userMessage){
        gameManager.getRoom(room).getGame().setPlayerClaim(userMessage.getSender(), "false");
        gameManager.getRoom(room).getGame().checkNoClaimsAtAll();
        sendingOperations.convertAndSend("/topic/game/" + room, gameManager.getRoom(room).getGame());
    }

    /**
     * Recieve a Challenge message from one user, then add the challenge and send an update to all clients
     */
    @MessageMapping("/game.challenge/{room}")
    public void challenge(@DestinationVariable String room, @Payload UserMessage userMessage){
        gameManager.getRoom(room).getGame().challenge(userMessage.getSender());
        sendingOperations.convertAndSend("/topic/game/" + room, gameManager.getRoom(room).getGame());
    }

    /**
     * Receive a Did Not Challenge message from one user, then do not add the challenge and send an update to all clients
     */
    @MessageMapping("/game.noChallenge/{room}")
    public void noChallenge(@DestinationVariable String room, @Payload UserMessage userMessage){
        gameManager.getRoom(room).getGame().noChallenge(userMessage.getSender());
        sendingOperations.convertAndSend("/topic/game/" + room, gameManager.getRoom(room).getGame());
    }
}
