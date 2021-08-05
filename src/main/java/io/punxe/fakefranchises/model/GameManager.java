package io.punxe.fakefranchises.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class GameManager {
    private Set<Room> roomList = new HashSet<Room>();
    private HashMap<String, Player> playerList = new HashMap<String, Player>();
    private Map<Player, Room> roomOfPlayer = new HashMap<Player, Room>();

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

    public void addPlayer(String name){
        playerList.put(name, new Player(name));
    }
    public void removePlayer(String name){
        playerList.remove(name);
    }
}
