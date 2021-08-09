package io.punxe.fakefranchises.WebSocketMessageTypes;

public class MoveMessage {
    private String sender;
    private int prevLoc;
    private int rollAmount;
    private int curLoc;


    public MoveMessage(String sender, int prevLoc, int rollAmount, int curLoc) {
        this.sender = sender;
        this.prevLoc = prevLoc;
        this.rollAmount = rollAmount;
        this.curLoc = curLoc;
 
    }
    public int getPrevLoc() {
        return prevLoc;
    }
    public void setPrevLoc(int prevLoc) {
        this.prevLoc = prevLoc;
    }
    public int getRollAmount() {
        return rollAmount;
    }
    public void setRollAmount(int rollAmount) {
        this.rollAmount = rollAmount;
    }
    public int getCurLoc() {
        return curLoc;
    }
    public void setCurLoc(int curLoc) {
        this.curLoc = curLoc;
    }
    public String getSender() {
        return sender;
    }
    public void setSender(String sender) {
        this.sender = sender;
    }
    
}
