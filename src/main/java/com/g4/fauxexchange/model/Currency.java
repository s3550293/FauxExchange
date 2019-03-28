package com.g4.fauxexchange.model;

import org.springframework.data.annotation.Id;

public class Currency {
	
	@Id
	public String id;

	public String code;
	public String name;
	public String url;
	public double price;

	public Currency() {}

	public Currency(String code, String name) {
		this.code = code;
		this.name = name;
	}

	@Override
	public String toString() {
		return String.format("Currency[id=%s, code='%s', name='%s']", id, code, name);
	}

}