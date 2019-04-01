package com.g4.fauxexchange.service;

import java.util.Collection;
import java.net.URL;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.apache.commons.io.IOUtils;
import org.json.*;

import com.g4.fauxexchange.model.Currency;
import com.g4.fauxexchange.service.CurrencyService;
import com.g4.fauxexchange.dao.CurrencyRepository;


@Service
public class CurrencyServiceImpl implements CurrencyService {

	@Autowired
    private CurrencyRepository repository;

	@Override
	public void createCurrency(Currency currency) {
		repository.save(currency);
	}

	@Override
	@Scheduled(fixedRate=60000, initialDelay = 60000)
	public void updateCurrency() {
		System.out.println("UPDATE CURRENCIES:");
		for(Currency currency : repository.findAll()) {
			JSONObject json = null;
			try {
				json = new JSONObject(IOUtils.toString(new URL("https://api.cryptonator.com/api/ticker/"+currency.code+"-aud")));
			} catch(Exception e) {
				e.printStackTrace();
			}

			if(json != null) {
				currency.price = json.getJSONObject("ticker").getDouble("price");
				currency.change = json.getJSONObject("ticker").getDouble("change");
				repository.save(currency);
			}

			System.out.println(currency.code + " | " + currency.price);
		}
	}

	public void deleteCurrency(Currency currency) {

	}

	public Collection<Currency> getCurrencies() {
		return repository.findAll();
	}

}