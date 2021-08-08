package io.punxe.fakefranchises.WebSocketMessageTypes;

import io.punxe.fakefranchises.model.Player;

public class PlayerDataMessage {
    private String roomCode;
    private Player[] playerData;

    public PlayerDataMessage(String roomCode, Player[] playerData) {
        this.roomCode = roomCode;
        this.playerData = playerData;
    }
    public String getRoomCode() {
        return roomCode;
    }
    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }
    public Player[] getPlayerData() {
        return playerData;
    }
    public void setPlayerData(Player[] playerData) {
        this.playerData = playerData;
    }
    
}
