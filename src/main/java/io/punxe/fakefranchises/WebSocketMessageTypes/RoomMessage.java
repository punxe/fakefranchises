package io.punxe.fakefranchises.WebSocketMessageTypes;

public class RoomMessage {
    private String roomCode;
    private String sender;
    public String getRoomCode() {
        return roomCode;
    }
    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }
    public String getSender() {
        return sender;
    }
    public void setSender(String sender) {
        this.sender = sender;
    }

    
}
