package com.g4.fauxexchange.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;

import com.g4.fauxexchange.service.TransactionService;
import com.g4.fauxexchange.model.Transaction;

@RestController
public class TransactionServiceController {
    
    @Autowired
    TransactionService tService;

    /* Get Transaction API Call */
    @RequestMapping(value = "/api/transaction/all", method = RequestMethod.GET)
    public ResponseEntity<Object> getTransactions() {
        return new ResponseEntity<>(tService.getTransactions(), HttpStatus.OK);
    }
}