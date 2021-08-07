package io.punxe.fakefranchises.WebSocketMessageTypes;

public class UserListMessage {
    private String roomCode;
    private String[] userList;

    public UserListMessage(String roomCode, String[] userList) {
        this.roomCode = roomCode;
        this.userList = userList;
    }
    public String getRoomCode() {
        return roomCode;
    }
    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }
    public String[] getUserList() {
        return userList;
    }
    public void setUserList(String[] userList) {
        this.userList = userList;
    }
    
}
