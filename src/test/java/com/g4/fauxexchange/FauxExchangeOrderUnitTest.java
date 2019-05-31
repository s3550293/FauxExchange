package com.g4.fauxexchange;

import com.g4.fauxexchange.model.Order;

import org.junit.Test;
import static org.junit.Assert.*;

public class FauxExchangeOrderUnitTest {
    Order order = new Order("1231231","buy","BTC",10.40,23.0,"test@gmail.com");

    @Test
	public void TestOrderId() {
		assertNotNull(order.getOrderId());
	}
	
	@Test
	public void TestType() {
		assertNotNull(order.getType());
	}

	@Test
	public void TestCode() {
		assertNotNull(order.getCode());
	}

	@Test
	public void TestPrice() {
		assertNotNull(order.getPrice());
	}

	@Test
	public void TestQty() {
		assertNotNull(order.getQty());
	}

	@Test
	public void TestUserId() {
		assertNotNull(order.getUserId());
	}
}