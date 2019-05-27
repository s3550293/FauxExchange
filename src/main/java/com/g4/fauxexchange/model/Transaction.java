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

    public Transaction(String type, String code, double ppc, double qty, double value, String userId) {
        this.type = type;
        this.code = code;
        this.ppc = ppc;
        this.qty = qty;
        this.value = value;
        this.userId = userId;
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

    public String getTransactionId() {
        return this.transactionId;
    }

    public String getType() {
        return this.type;
    }

    public String getCode() {
        return this.code;
    }

    public double getPpc() {
        return this.ppc;
    }

    public double getQty() {
        return this.qty;
    }

    public double getValue() {
        return this.value;
    }

    public String getUserId() {
        return this.userId;
    }

    public double getPnl() {
        return this.pnl;
    }

}