package com.g4.fauxexchange.dao;

import java.util.List;

import com.g4.fauxexchange.model.Order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
	public List<Order> findByCode(String code);
}