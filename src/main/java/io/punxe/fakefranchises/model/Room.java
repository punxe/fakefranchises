package io.punxe.fakefranchises.model;

import java.util.HashMap;
import java.util.Iterator;

public class Room {
    private String code;
    private String host;
    private boolean gameStarted;
    private HashMap<String, Player> players = new HashMap<String, Player>();
    private Game game;

    /**
     * Constructor to create a room given a code and host
     */
    public Room(String code, String host){
        this.code = code;
        this.host = host;
        this.gameStarted = false;
    }

    /**
     * Initialize a game state with the current players
     */
    public void startGame(){
        
        this.gameStarted = true;
        game = new Game(players);
    }

    
    /**
     * Adds a Player object to the room
     */
    public void addPlayer(Player p){
        players.put(p.getName(), p);
    }


    /**
     * Removes a user from the room given their name
     */
    public void removePlayer(String name){
        players.remove(name);
        if(host.equals(name)){
            if(players.size() == 0){
                host = "";
            }else{
                host = players.keySet().iterator().next();
            }
        }
        
    }

    /**
     * Returns a String array containing the names of all the users in the room
     */
    public String[] getPlayerListByName(){
        Iterator<String> itr = players.keySet().iterator();
        String[] playerList = new String[players.size()];
        int iteration = 0;
        while(itr.hasNext()){
            playerList[iteration] = itr.next();
            iteration++;
        }
        return playerList;
    }

    /**
     * Returns a Player array containing all the users in the room
     */
    public Player[] getPlayerListByPlayer(){
        Iterator<String> itr = players.keySet().iterator();
        Player[] playerList = new Player[players.size()];
        int iteration = 0;
        while(itr.hasNext()){
            playerList[iteration] = players.get(itr.next());
            iteration++;
        }
        return playerList;
    }

    /**
     * Rolls a dice and then moves the player by that amount
     */
    public int rollDice(String player){
        int x = 1 + (int)(Math.random()*6);
        game.movePlayer(player, x);
        
        return x;
    }

    //The following are getters and setters
    
    public void setGameStarted(boolean gameStarted) {
        this.gameStarted = gameStarted;
    }
    public boolean isGameStarted() {
        return gameStarted;
    }
    public String getHost(){
        return host;
    }
    public String getCode(){
        return code;
    }
    public HashMap<String, Player> getPlayers(){
        return players;
    }
    public Game getGame() {
        return game;
    }
    public void setGame(Game game) {
        this.game = game;
    }
}
