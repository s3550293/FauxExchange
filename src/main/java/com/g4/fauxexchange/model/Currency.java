package com.g4.fauxexchange.model;

import java.util.LinkedList;
import java.util.Date;
import java.time.Instant;
import java.text.SimpleDateFormat;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Currency {
	
	@Id
	public String currencyId;

	public String code;
	public String name;

    public LinkedList<Double> price;
    public LinkedList<Double> change;
    public LinkedList<Long> time;

	public Currency() {}

	public Currency(String code, String name) {
		this.code = code;
		this.name = name;
        this.price = new LinkedList<Double>();
        this.change = new LinkedList<Double>();
        this.time = new LinkedList<Long>();
	}

    public Currency(String code, String name, double price) {
        this.code = code;
        this.name = name;
        this.price = new LinkedList<Double>();
        this.price.add(new Double(price));
        this.time = new LinkedList<Long>();
        this.time.add(new Long(Instant.now().getEpochSecond()));
    }

    public void addPrice(Double value) {
        if(this.price.peekLast() != null) {
            this.change.add(new Double(value - this.price.peekLast()));
            this.price.add(value);
            this.time.add(new Long(Instant.now().getEpochSecond()));
        } else {
            this.price.add(value);
            this.change.add(new Double(0.0));
            this.time.add(new Long(Instant.now().getEpochSecond()));
        }
    }

    public Double getPrice() {
        return this.price.peekLast();
    }

    public String getCode() {
        return this.code;
    }

    public String getName() {
        return this.name;
    }

	@Override
	public String toString() {
		return String.format("Currency[id=%s, code='%s', name='%s', price='%f', change='%f', time='%d']", 
            currencyId, code, name, price.peekLast(), change.peekLast(), time.peekLast());
	}

}
