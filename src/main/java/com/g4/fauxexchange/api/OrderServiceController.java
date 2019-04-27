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

import com.g4.fauxexchange.service.OrderService;
import com.g4.fauxexchange.model.Order;

@RestController
public class OrderServiceController {
    
    @Autowired
    OrderService orderService;

    @GetMapping("/api/orders")
    public ResponseEntity<Object> getCurrencies() {
        return new ResponseEntity<>(orderService.getOrders(), HttpStatus.OK);
    }


    @PostMapping("/api/orders")
    public ResponseEntity<Object> createOrder(@RequestBody Order order) {
        orderService.createOrder(order);
        return new ResponseEntity<>("Hello World!", HttpStatus.OK);
    }
}