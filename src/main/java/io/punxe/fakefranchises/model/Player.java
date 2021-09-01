package io.punxe.fakefranchises.model;

public class Player {
    private String name;
    private String roomCode;
    private boolean ready;
    public Player(String name){
        this.name = name;
        roomCode = "homepage";
        ready = false;
    }

    public boolean equals(Object obj){
        if(!(obj instanceof Player)){
            return false;
        }
        return this.getName().equals(((Player)obj).getName());
    }

    //The following are just getters and setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String roomCode) {
        this.roomCode = roomCode;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }
    
    
}
