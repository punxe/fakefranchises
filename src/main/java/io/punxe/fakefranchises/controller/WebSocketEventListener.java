package io.punxe.fakefranchises.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import io.punxe.fakefranchises.WebSocketMessageTypes.UserListMessage;
import io.punxe.fakefranchises.manager.GameManager;
import io.punxe.fakefranchises.model.Room;

@Component
public class WebSocketEventListener {
	
	@Autowired
	private GameManager gameManager;

	@Autowired
	private SimpMessageSendingOperations sendingOperations;

	/**
	 * When a new websocket connection is made, do nothing.
	 */
	@EventListener
	public void handleWebSocketConnectListener(final SessionConnectedEvent event) {

	}

	/**
	 * When a current websocket connection disconnects, remove the correspnding player from the server and send an update to all clients
	 */
	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String username = (String) headerAccessor.getSessionAttributes().get("username");
		String thisPlayersRoomCode = gameManager.getPlayer(username).getRoomCode();
		

		if (!thisPlayersRoomCode.equals("homepage")) {
			Room room = gameManager.getRoom(thisPlayersRoomCode);
			room.removePlayer(username);
			if (room.getPlayers().size() == 0) {
				gameManager.removeRoom(thisPlayersRoomCode);
			}
			sendingOperations.convertAndSend("/topic/rooms", gameManager.getRoomList());
			sendingOperations.convertAndSend("/topic/users/" + thisPlayersRoomCode, new UserListMessage(thisPlayersRoomCode, room.getPlayerListByName()));
		}
		gameManager.removePlayer(username);
		sendingOperations.convertAndSend("/topic/users/homepage", new UserListMessage("homepage", gameManager.getPlayerListByName()));

	}

}
