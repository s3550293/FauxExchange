package com.g4.fauxexchange.model;

public class LeaderboardInfo {

    public String name;
    public int rank;
    public double value;

    public LeaderboardInfo(String name, int rank, double value) {
        this.name = name;
        this.rank = rank;
        this.value = value;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRank() {
        return this.rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public double getValue() {
        return this.value;
    }

    public void setValue(double value) {
        this.value = value;
    }

}
    