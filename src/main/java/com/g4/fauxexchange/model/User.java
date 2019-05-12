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

    public LinkedList<Currency> wallet;

    public User() {}

	public User(String fName, String lName, String dob, String email, String password) {
        this.fName = fName;
        this.lName = lName;
        this.dob = dob;
        this.email = email;
        this.password = password;
    }

	@Override
	public String toString() {
		return String.format("User[id=%s, fName='%s', lName='%s', dob='%s', email='%s', password='%s']", userId, fName, lName, dob, email, password);
	}

}