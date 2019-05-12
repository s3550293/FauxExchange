package com.g4.fauxexchange.model;

import java.util.LinkedList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Order {
	
	@Id
	public String orderId;

	public String type;
    public String code;
    public double price;
	public double qty;
    public String userId;

    public Order() {}

	public Order(String type, String code, double price, double qty) {
        this.type = type;
        this.code = code;
        this.price = price;
        this.qty = qty;
        this.userId = null;
    }

	@Override
	public String toString() {
		return String.format("Order[id=%s, type='%s', code='%s', price='%f', qty='%f']", id, type, code, price, qty, userId);
	}

}