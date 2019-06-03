package com.g4.fauxexchange.api;

import com.g4.fauxexchange.service.CurrencyService;
import com.g4.fauxexchange.model.Currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyServiceController {
    
    @Autowired
    private CurrencyService currencyService;

/* Get Currencies API Call */
    @RequestMapping(value = "/api/currencies", method = RequestMethod.GET)
    public ResponseEntity<Object> getCurrencies() {
        return new ResponseEntity<Object>(currencyService.getCurrencies(), HttpStatus.OK);
    }

/* Get Currency by Code API Call */
    @RequestMapping(value = "/api/currencies/{code}", method = RequestMethod.GET)
    public ResponseEntity<Object> getCurrencyByCode(@PathVariable("code") String code) {
        return new ResponseEntity<Object>(currencyService.getCurrency(code), HttpStatus.OK);
    }

}