package com.g4.fauxexchange.model;

import java.util.Date;
import java.time.Instant;
import java.text.SimpleDateFormat;

public class Price {

    double value;
    double change;
    long time;

    public Price() {}

    public Price(double value) {
        this.value = value;
        this.change = 0.0;
        this.time = Instant.now().getEpochSecond();
    }

    public double getValue() {
        return this.value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public double getChange() {
        return this.change;
    }

    public void setChange(double change) {
        this.change = change;
    }

    public long getTime() {
        return this.time;
    }

    public void setTime(long time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return String.format("Price[value='%f', change='%f', time='%d']", value, change, time);
    }

}
    