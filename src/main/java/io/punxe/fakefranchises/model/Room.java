package io.punxe.fakefranchises.model;

import java.util.ArrayList;

public class Room {
    private boolean gameStarted = false;
    private ArrayList<Player> players = new ArrayList<Player>();

    public boolean isGameStarted() {
        return gameStarted;
    }

    public void setGameStarted(boolean gameStarted) {
        this.gameStarted = gameStarted;
    }

    public void addPlayer(Player p){
        players.add(p);
    }
}
