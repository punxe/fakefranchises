package io.punxe.fakefranchises.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

public class Room {
    private String code;
    private String host;
    private boolean gameStarted;
    private HashMap<String, Player> players = new HashMap<String, Player>();
    private Game game;

    public Room(String code, String host){
        this.code = code;
        this.host = host;
        this.gameStarted = false;
    }

    public void startGame(){
        //initialize game state with current players
        this.gameStarted = true;
        game = new Game(players);
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

    public void setGameStarted(boolean gameStarted) {
        this.gameStarted = gameStarted;
    }

    public void addPlayer(Player p){
        players.put(p.getName(), p);
    }

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

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
    
    /*public void rollDice(String player){
        game.movePlayer(player, (int)(Math.random()*6));
    }*/
}
