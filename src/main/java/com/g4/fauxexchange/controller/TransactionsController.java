package com.g4.fauxexchange.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TransactionsController {

    /*
    *   Calls the login page
    */
    @GetMapping("/transactions")
    public String Register(){
        return "transactions";
    }
    
}