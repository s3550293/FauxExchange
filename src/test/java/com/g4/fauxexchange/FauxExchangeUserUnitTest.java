package com.g4.fauxexchange;

import com.g4.fauxexchange.model.User;

import org.junit.Test;
import static org.junit.Assert.*;

public class FauxExchangeUserUnitTest {
    User user = new User("TestFName","TestLName","03/12/1995","test@gmail.com","password");

    @Test
	public void TestFName() {
		assertNotNull(user.getFName());
	}
	
	@Test
	public void TestLName() {
		assertNotNull(user.getLName());
	}

	@Test
	public void TestDOB() {
		assertNotNull(user.getLName());
	}

	@Test
	public void TestEmail() {
		assertNotNull(user.getEmail());
	}

	@Test
	public void TestPassword() {
		assertNotNull(user.getPassword());
	}
}