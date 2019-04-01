package com.g4.fauxexchange.service;

import java.util.Collection;
import com.g4.fauxexchange.model.Currency;

public interface CurrencyService {
	public abstract void createCurrency(Currency currency);
	public abstract void updateCurrency();
	public abstract void deleteCurrency(Currency currency);
	public abstract Collection<Currency> getCurrencies();
}