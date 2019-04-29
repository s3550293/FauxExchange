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
    private CurrencyRepository currencyRepository;

    @Override
    public void createCurrency(Currency currency) {
        currencyRepository.save(currency);
    }

    @Override
    @Scheduled(fixedRate=60000, initialDelay = 60000)
    public void updateCurrency() {
        System.out.println("- Updating Currencies -");
        for(Currency currency : currencyRepository.findAll()) {
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
                currencyRepository.save(currency);
            }

            System.out.println("Updated: " + currency);
        }
    }

    @Override
    public void deleteCurrency(Currency currency) {

    }

    @Override
    public List<Currency> getCurrencies() {
        return currencyRepository.findAllWithRecentPrices();
    }

    @Override
    public Currency getCurrency(String code) {
        return currencyRepository.findByCode(code);
    }

}