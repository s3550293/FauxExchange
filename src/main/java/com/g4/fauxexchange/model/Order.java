package com.g4.fauxexchange.model;

import java.util.LinkedList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Order {
	
	@Id
	public String id;

	public String code;
	public int type;
    public double price;
	public double qty;

    public Order() {}

	public Order(String code, int type, double price, double qty) {
        this.code = code;
        this.type = type;
        this.price = price;
        this.qty = qty;
    }



	@Override
	public String toString() {
		return String.format("Order[id=%s, type='%s', code='%s', name='%s', qty='%s']", id, type, code, price, qty);
	}

}