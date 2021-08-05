package io.punxe.fakefranchises.model;

public class Player {
    private String name;

    public Player(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean equals(Object obj){
        if(!(obj instanceof Player)){
            return false;
        }
        return this.getName().equals(((Player)obj).getName());
    }
    
}
