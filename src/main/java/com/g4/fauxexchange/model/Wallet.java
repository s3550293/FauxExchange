package com.g4.fauxexchange.model;

public class Wallet {

    public String code;
    public double price;
    public double qty;
    public double value;

    public Wallet() {}

    public Wallet(String code, double price, double qty) {
        this.code = code;
        this.price = price;
        this.qty = qty;
        this.value = price * qty;
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

    public double getValue() {
        return this.value;
    }

    public void setValue(double value) {
        this.value = value;
    }

}