package com.g4.fauxexchange.model;

import java.util.LinkedList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Users {
	
	@Id
	public String userId;

	public String fName;
    public String lName;
    public String dob;
    public String email;
    public String password;

    public LinkedList<Currency> wallet;

    public Users() {}

	public Users(String name, String email, String password) {

    }

	@Override
	public String toString() {
		return String.format("Users[id=%s, fName, lName, dob, email, password]", id, fName, lName, dob, email, password);
	}

}