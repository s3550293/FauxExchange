package com.g4.fauxexchange.model;

import java.util.LinkedList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Transaction {

    @Id
    public String transactionId;

    public String type;
    public String code;
    public double ppc;
    public double qty;
    public double value;
    public String userId;

    //Profit or Loss value
    public double pnl;

    public Transaction(Order order) {
        this.type = order.getType();
        this.code = order.getCode();
        this.ppc = order.getPrice();
        this.qty = order.getQty();
        this.value = order.getValue();
        this.userId = order.getUserId();
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setPPC(double ppc) {
        this.ppc = ppc;
    }

    public void setQTY(double qty) {
        this.qty = qty;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setPNL(double pnl) {
        this.pnl = pnl;
    }
}