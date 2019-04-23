package com.g4.fauxexchange.service;

import java.util.List;
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
        for(Currency currency : repository.findAll()) {
            JSONObject json = null;
            try {
                json = new JSONObject(IOUtils.toString(new URL("https://api.cryptonator.com/api/ticker/"+currency.code+"-aud")));
            } catch(Exception e) {
                e.printStackTrace();
            }

            if(json != null) {
                Double oldPrice = currency.price.peekLast();
                currency.price.add(new Double(json.getJSONObject("ticker").getDouble("price")));
                Double newPrice = currency.price.peekLast();
                currency.change = newPrice - oldPrice;
                repository.save(currency);
            }

            System.out.println("Updated: " + currency);
        }
    }

    public void deleteCurrency(Currency currency) {

    }

    public List<Currency> getCurrencies() {
        return repository.findAll();
    }

    public Currency getCurrency(String code) {
        return repository.findByCode(code);
    }

}