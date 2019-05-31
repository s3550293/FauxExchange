package com.g4.fauxexchange;

import com.g4.fauxexchange.model.Wallet;

import org.junit.Test;
import static org.junit.Assert.*;

public class FauxExchangeWalletUnitTest {
    Wallet wallet = new Wallet("BTC",25.0,10.0);

    @Test
	public void TestCode() {
		assertNotNull(wallet.getCode());
	}
	
	@Test
	public void TestPrice() {
		assertNotNull(wallet.getPrice());
	}

	@Test
	public void TestQty() {
		assertNotNull(wallet.getQty());
	}
}