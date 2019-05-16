package com.g4.fauxexchange;

import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.apache.commons.io.IOUtils;
import org.json.*;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.g4.fauxexchange.model.Currency;
import com.g4.fauxexchange.dao.CurrencyRepository;

@SpringBootApplication
@EnableScheduling
public class FauxexchangeApplication implements CommandLineRunner {

    @Autowired
    private CurrencyRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(FauxexchangeApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        repository.deleteAll();

        // save a couple of Currency
        repository.save(new Currency("XRP", "Ripple"));
        repository.save(new Currency("SALT", "SALT"));
        repository.save(new Currency("BTC", "Bitcoin"));
        repository.save(new Currency("ETH", "Ethereum"));
        repository.save(new Currency("LTC", "Litecoin"));
        repository.save(new Currency("MKR", "Maker"));
        repository.save(new Currency("ZEC", "Zcash"));
        repository.save(new Currency("DASH", "Dash"));
        repository.save(new Currency("EOS", "EOS"));
        repository.save(new Currency("DOGE", "Dogecoin"));

        System.out.println("Added crypto currencies into the database");

        for(Currency currency : repository.findAll()) {
            System.out.println(currency);
        }
    }

}
