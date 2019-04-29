package com.g4.fauxexchange.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class OrderController {

    /*
    *   Calls the currency Page that displays all signal currencies
    */
    @GetMapping("/orders")
    public String Orders() {
        return "orders";
    }

}