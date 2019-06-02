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

    public Order(String orderId, String type, String code, double price, double qty, String userId) {
        this.orderId = orderId;
        this.type = type;
        this.code = code;
        this.price = price;
        this.qty = qty;
        this.userId = userId;
    }

    @Override
	public String toString() {
		return String.format("Order[id=%s, type='%s', code='%s', price='%f', qty='%f', userId='%s']", orderId, type, code, price, qty, userId);
	}

    // Getters & Setters
    
    public String getOrderId() {
        return this.orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getQty() {
        return this.qty;
    }

    public void setQty(double qty) {
        this.qty = qty;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    // Custom Getters & Setters

    // Return the current value of the order based on price per coin * qty
    public double getValue() {
        return this.price * this.qty;
    }

}