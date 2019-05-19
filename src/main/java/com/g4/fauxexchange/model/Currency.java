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
	}

    public void addPrice(double value, double oldvalue) {
        price.addValue(value, oldvalue);
    }

    public double getPrice() {
        return this.price.peekLast().getValue();
    }

    public String getCode() {
        return this.code;
    }

    public String getName() {
        return this.name;
    }

	@Override
	public String toString() {
		return String.format("Currency[id=%s, code='%s', name='%s', %s]", 
            currencyId, code, name, price.toString());
	}

}