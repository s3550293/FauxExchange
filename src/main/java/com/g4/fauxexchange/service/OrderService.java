package com.g4.fauxexchange.service;

import java.util.List;
import com.g4.fauxexchange.model.Order;

public interface OrderService {
    public abstract void createOrder(Order order);
    public abstract void updateOrder();
    public abstract void deleteOrder(Order order);
    public abstract void processOrders();
    public abstract List<Order> getOrders();
    public abstract List<Order> getOrders(String code);
}