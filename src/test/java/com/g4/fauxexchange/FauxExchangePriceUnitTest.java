package com.g4.fauxexchange;

import com.g4.fauxexchange.model.Price;

import org.junit.Test;
import static org.junit.Assert.*;

public class FauxExchangePriceUnitTest {
    Price price = new Price(12.50);

    @Test
	public void TestValue() {
		assertNotNull(price.getValue());
	}
}