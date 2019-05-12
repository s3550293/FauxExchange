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
	public LinkedList<Double> price;
	public double change;

	public Currency() {}

	public Currency(String code, String name) {
		this.code = code;
		this.name = name;
        this.price = new LinkedList<Double>();
        this.price.add(new Double(0.0));
	}

	@Override
	public String toString() {
		return String.format("Currency[id=%s, code='%s', name='%s', price='%s']", currencyId, code, name, price.peekLast());
	}

}