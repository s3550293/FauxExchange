package com.g4.fauxexchange.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.g4.fauxexchange.service.CurrencyService;
import com.g4.fauxexchange.model.Currency;

@RestController
public class CurrencyServiceController {
	
	@Autowired
	CurrencyService currencyService;

	@RequestMapping(value = "/api/currencies")
	public ResponseEntity<Object> getCurrencies() {
		return new ResponseEntity<>(currencyService.getCurrencies(), HttpStatus.OK);
	}
}