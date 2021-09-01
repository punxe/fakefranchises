package io.punxe.fakefranchises.manager;

import java.util.HashMap;
import java.util.Iterator;

import org.springframework.stereotype.Component;

import io.punxe.fakefranchises.model.Player;
import io.punxe.fakefranchises.model.Room;

@Component
public class GameManager {
    private HashMap<String, Room> roomList = new HashMap<String, Room>();
    private HashMap<String, Player> playerList = new HashMap<String, Player>();

    /**
     * Adds a user based on the user's name
     */
    public void addPlayer(String name){
        playerList.put(name, new Player(name));
    }

    /**
     * Removes a user based on the user's name
     */
    public void removePlayer(String name){
        playerList.remove(name);
    }

    /**
     * Gets a user based on the user's name 
     */
    public Player getPlayer(String name){
        return playerList.get(name);
    }

    /**
     * Adds a Room based on the room code and the name of the host
     */
    public void addRoom(String code, String host){
        roomList.put(code, new Room(code, host));
    }

    /**
     * Removes a Room based on the room code
     */
    public void removeRoom(String code){
        roomList.remove(code);
    }

    /**
     * Returns a Room based on the room code
     */
    public Room getRoom(String code){
        return roomList.get(code);
    }

    /**
     * Returns a Room array containing all the rooms currently in the game
     */
    public Room[] getRoomList(){
        
        Iterator<String> itr = roomList.keySet().iterator();
        Room[] rooms = new Room[roomList.size()];
        int iteration = 0;
        while(itr.hasNext()){
            rooms[iteration] = roomList.get(itr.next());
            iteration++;
        }
        return rooms;
    }

    /**
     * Returns a String array containing the names of all the players currently in the game
     */
    public String[] getPlayerListByName(){
        Iterator<String> itr = playerList.keySet().iterator();
        String[] players = new String[playerList.size()];
        int iteration = 0;
        while(itr.hasNext()){
            players[iteration] = itr.next();
            iteration++;
        }
        return players;
    }
}
