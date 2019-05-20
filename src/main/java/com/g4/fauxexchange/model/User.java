package com.g4.fauxexchange.model;

import java.util.LinkedList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {
	
	@Id
	public String userId;

	public String fName;
    public String lName;
    public String dob;
    public String email;
    public String password;
    
    private String role;

    public LinkedList<Currency> wallet;
    public LinkedList<String> friends;

    public User() {}

	public User(String fName, String lName, String dob, String email, String password) {
        this.fName = fName;
        this.lName = lName;
        this.dob = dob;
        this.email = email;
        this.password = password;
        role = "GENERIC";
        wallet = new LinkedList<Currency>();
        wallet.add(new Currency("AUD", "Australian Dollar", 1000.0));
    }

	@Override
	public String toString() {
		return String.format("User[id=%s, fName='%s', lName='%s', dob='%s', email='%s', password='%s']", userId, fName, lName, dob, email, password);
	}

    public String getUserId() {
        return this.userId;
    }

    public String getFName() {
        return this.fName;
    }

    public void setFName(String fName) {
        this.fName = fName;
    }

    public String getLName() {
        return this.lName;
    }

    public void setLName(String lName) {
        this.lName = lName;
    }

    public String getDob() {
        return this.dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LinkedList<Currency> getWallet() {
        return this.wallet;
    }

    public void setWallet(LinkedList<Currency> wallet) {
        this.wallet = wallet;
    }

    public void createWallet() {
        wallet = new LinkedList<Currency>();
        wallet.add(new Currency("AUD", "Australian Dollar", 1000.0));
    }

    public void createBlankWallet() {
        wallet = new LinkedList<Currency>();
    }

    public void createFriendsList() {
        friends = new LinkedList<String>();
    }

}