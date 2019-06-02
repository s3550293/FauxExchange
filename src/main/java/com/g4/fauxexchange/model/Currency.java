package com.g4.fauxexchange.model;

import java.util.LinkedList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Currency {
	
	@Id
	public String currencyId;

	public String code;
	public String name;
    public LinkedList<Price> price;

	public Currency() {}

	public Currency(String code, String name) {
		this.code = code;
		this.name = name;
        this.price = new LinkedList<Price>();
        this.price.add(new Price(0.0));
	}

	@Override
	public String toString() {
		return String.format("Currency[id=%s, code='%s', name='%s'] | %s", 
            currencyId, code, name, price.peekLast());
	}

    // Getters & Setters

    public String getCurrencyId() {
        return this.currencyId;
    }

    public void setCurrencyId(String currencyId) {
        this.currencyId = currencyId;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getters & Setters

    // Update the current price in the Currency, given a price.
    public void update(Price price) {
        if(!this.price.isEmpty()) {
            price.setChange(price.getValue() - this.price.peekLast().getValue());
            this.price.add(price);
        }  
    }

    // Return the most recent price
    public double getRecentPrice() {
        return this.price.peekLast().getValue();
    }

    // Return the most recent change
    public double getRecentChange() {
        return this.price.peekLast().getChange();
    }

}