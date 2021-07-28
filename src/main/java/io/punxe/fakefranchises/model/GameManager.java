package io.punxe.fakefranchises.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

@Component
public class GameManager {
    private Set<Room> roomList = new HashSet<Room>();
    private Set<Player> playerList = new HashSet<Player>();
    private Map<Player, Room> roomOfPlayer = new HashMap<Player, Room>();
}
