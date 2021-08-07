package io.punxe.fakefranchises.model;

public class Action {
    private ActionType type;
    private String sender;
    private String roomCode;
    private String data;
    //private String[] arrayData;
    
    public Action(ActionType type, String sender) {
        this.type = type;
        this.sender = sender;
    }
    
    /*
    public Action(String roomCode, String[] arrayData){
        this.roomCode = roomCode;
        this.arrayData = arrayData;
    }
    */
    
    
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

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
    
    /*
    public String[] getArrayData() {
        return arrayData;
    }

    public void setArrayData(String[] arrayData) {
        this.arrayData = arrayData;
    }
    */
    
}
