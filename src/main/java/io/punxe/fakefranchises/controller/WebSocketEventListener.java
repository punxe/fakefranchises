package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import io.punxe.fakefranchises.model.Action;
import io.punxe.fakefranchises.model.ActionType;
import io.punxe.fakefranchises.model.GameManager;

@Component
public class WebSocketEventListener {
	@Autowired
	private GameManager gameManager;

	@Autowired
	private SimpMessageSendingOperations sendingOperations;

	@EventListener
	public void handleWebSocketConnectListener(final SessionConnectedEvent event) {

	}

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String username = (String) headerAccessor.getSessionAttributes().get("username");
		String thisPlayersRoomCode = gameManager.getPlayer(username).getRoomCode();
		

		if (!thisPlayersRoomCode.equals("-1")) {
			gameManager.getRoom(thisPlayersRoomCode).removePlayer(username);
			if (gameManager.getRoom(thisPlayersRoomCode).getPlayers().size() == 0) {
				gameManager.removeRoom(thisPlayersRoomCode);
			}
			sendingOperations.convertAndSend("/topic/rooms", gameManager.getRoomList());
		}
		// Action action = new Action(ActionType.DISCONNECT, username);
		gameManager.removePlayer(username);
		sendingOperations.convertAndSend("/topic/users", gameManager.getPlayerListByName());

	}

}
