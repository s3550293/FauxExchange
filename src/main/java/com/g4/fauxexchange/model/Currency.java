package com.g4.fauxexchange.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Currency {
	
	@Id
	public String id;

	public String code;
	public String name;
	public double price;
	public double change;

	public Currency() {}

	public Currency(String code, String name) {
		this.code = code;
		this.name = name;
	}

	@Override
	public String toString() {
		return String.format("Currency[id=%s, code='%s', name='%s', price='%f']", id, code, name, price);
	}

}