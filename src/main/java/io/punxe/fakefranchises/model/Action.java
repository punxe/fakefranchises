package io.punxe.fakefranchises.model;

public class Action {
    private ActionType type;
    private String sender;
    private String roomCode;

    
    public Action(ActionType type, String sender) {
        this.type = type;
        this.sender = sender;
    }
    
    public ActionType getType() {
        return type;
    }
    public void setType(ActionType type) {
        this.type = type;
    }
    public String getSender() {
        return sender;
    }
    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomId) {
        this.roomCode = roomId;
    }
    
}
