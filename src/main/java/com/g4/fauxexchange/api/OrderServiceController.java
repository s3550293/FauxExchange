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

    @RequestMapping(value = "/api/orders", method = RequestMethod.GET)
    public ResponseEntity<Object> getOrders() {
        return new ResponseEntity<>(orderService.getOrders(), HttpStatus.OK);
    }


    @RequestMapping(value = "/api/orders", method = RequestMethod.POST)
    public ResponseEntity<Object> createOrder(@RequestBody Order order) {
        if(orderService.createOrder(order)) {
            return new ResponseEntity<>("Created Order Succesfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Failed to Create Order", HttpStatus.OK);       
    }
}