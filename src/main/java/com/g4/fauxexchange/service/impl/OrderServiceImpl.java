package com.g4.fauxexchange.service;

import java.util.List;
import java.net.URL;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.apache.commons.io.IOUtils;
import org.json.*;

import com.g4.fauxexchange.model.Order;
import com.g4.fauxexchange.model.User;
import com.g4.fauxexchange.model.Currency;
import com.g4.fauxexchange.service.OrderService;
import com.g4.fauxexchange.dao.OrderRepository;
import com.g4.fauxexchange.dao.CurrencyRepository;
import com.g4.fauxexchange.dao.UserRepository;


@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CurrencyRepository currencyRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void createOrder(Order order) {
        System.out.println("Creating -" + order);
        orderRepository.save(order);
    }

    @Override
    public void updateOrder() {

    }

    @Override
    public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }


    /* Expand on this function
        VoO & 1 coin or GT >= MarketValue * coin = Process Order
        vice versa
        VoO & 1 coin or GT <= MarketValue * coin = Process Order

        BUT

        VoO & 0.x coin % MarketValue * coin = Proces Order
        vice versa
        VoO & 0.x coin % MarketValue * coin = Process Order
     */
    @Override
    @Scheduled(fixedRate=60000, initialDelay = 60000)
    public void processOrders() {
        System.out.println("- Processing Orders -");
        for(Currency currency : currencyRepository.findAll()) {
            for(Order order : orderRepository.findByCode(currency.code)) {
                if(order.type.equals("buy")) {
                    if(order.price * order.qty >= currency.getPrice() * order.qty) {
                        System.out.println("Buying: " + order);
                        User user = userRepository.findByUserId(order.getUserId());
                        if(user.getWallet(order.code) != null) {
                            user.updateWallet(order.code, currency.getPrice(), user.getWallet(order.code).getQty() + order.qty);
                        } else {
                            user.addWallet(order.code, currency.getPrice(), order.qty);
                        }
                        user.updateWallet("AUD", 1, user.getWallet("AUD").getQty() - order.price);
                        userRepository.save(user);
                        deleteOrder(order);
                    }
                } else {
                    if(order.price * order.qty <= currency.getPrice() * order.qty) {
                        System.out.println("Selling: " + order);
                        User user = userRepository.findByUserId(order.getUserId());
                        if(user.getWallet(order.code) != null) {
                            user.updateWallet(order.code, currency.getPrice(), user.getWallet(order.code).getQty() - order.qty);
                        } else {
                            user.addWallet(order.code, currency.getPrice(), order.qty);
                        }
                        user.updateWallet("AUD", 1, user.getWallet("AUD").getQty() + order.price);
                        userRepository.save(user);
                        deleteOrder(order);
                    }
                }
            }
        }
    }


    @Override
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrders(String code) {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersByUserId(String id) {
        return orderRepository.findByUserId(id);
    }

}