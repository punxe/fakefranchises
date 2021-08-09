package io.punxe.fakefranchises.model;

import java.util.HashMap;
import java.util.Iterator;
import java.util.concurrent.ThreadLocalRandom;

public class Game {
    private int whoseTurn;
    private String[] players;
    private int playerAmount;
    private HashMap<String, Integer> playerCoins = new HashMap<String, Integer>();
    private HashMap<String, Integer> playerProperties = new HashMap<String, Integer>();
    private HashMap<String, Integer> playerLocations = new HashMap<String, Integer>();
    public Game(HashMap<String, Player> players){
        this.whoseTurn = 0;
        this.playerAmount = players.size();
        this.players = new String[playerAmount];
        Iterator<String> itr = players.keySet().iterator();
        int iteration = 0;
        while(itr.hasNext()){
            this.players[iteration] = itr.next();
            iteration++;
        }
        for(int i = 0; i < playerAmount; i++){
            this.playerCoins.put(this.players[i], 3);
            setRandomProperty(this.players[i]);
            this.playerLocations.put(this.players[i], 0);
        }
    }
    public void setRandomProperty(String player){
        int x = ThreadLocalRandom.current().nextInt(0, playerAmount*2);
        while(playerProperties.containsValue(x)){
            x = ThreadLocalRandom.current().nextInt(0, playerAmount*2);
        }
        playerProperties.put(player, x);
        
    }
    public int getWhoseTurn() {
        return whoseTurn;
    }
    public void setWhoseTurn(int whoseTurn) {
        this.whoseTurn = whoseTurn;
    }
    public String[] getPlayers() {
        return players;
    }
    public void setPlayers(String[] players) {
        this.players = players;
    }
    public int getPlayerAmount() {
        return playerAmount;
    }
    public void setPlayerAmount(int playerAmount) {
        this.playerAmount = playerAmount;
    }
    public int getCoinAmount(String player){
        return playerCoins.get(player);
    }
    public void setCoinAmount(String player, int amount){
        playerCoins.put(player, amount);
    }
    public int getProperty(String player){
        return playerProperties.get(player);
    }
    public void setProperty(String player, int propertyNumber){
        playerProperties.put(player, propertyNumber);
    }
    public HashMap<String, Integer> getPlayerCoins() {
        return playerCoins;
    }
    public void setPlayerCoins(HashMap<String, Integer> playerCoins) {
        this.playerCoins = playerCoins;
    }
    public HashMap<String, Integer> getPlayerProperties() {
        return playerProperties;
    }
    public void setPlayerProperties(HashMap<String, Integer> playerProperties) {
        this.playerProperties = playerProperties;
    }
    public HashMap<String, Integer> getPlayerLocations() {
        return playerLocations;
    }
    public void setPlayerLocations(HashMap<String, Integer> playerLocations) {
        this.playerLocations = playerLocations;
    }
    /*public void movePlayer(String player, int steps){
        int currentLoc = playerLocations.get(player);

    }*/
}

