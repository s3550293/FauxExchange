package com.g4.fauxexchange;

import com.g4.fauxexchange.model.Transaction;

import org.junit.Test;
import static org.junit.Assert.*;

public class FauxExchangeTransactionUnitTest {
    Transaction transaction = new Transaction("buy","BTC",12.5,10.0,125.0,"Test@gmail.com");

    @Test
	public void TestType() {
		assertNotNull(transaction.getType());
	}
	
	@Test
	public void TestCode() {
		assertNotNull(transaction.getCode());
	}

	@Test
	public void TestPpc() {
		assertNotNull(transaction.getPpc());
	}

	@Test
	public void TestQty() {
		assertNotNull(transaction.getQty());
	}

	@Test
	public void TestValue() {
		assertNotNull(transaction.getValue());
	}

	@Test
	public void TestUserId() {
		assertNotNull(transaction.getUserId());
	}
}