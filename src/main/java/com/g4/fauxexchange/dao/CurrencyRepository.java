package com.g4.fauxexchange.dao;

import java.util.List;

import com.g4.fauxexchange.model.Currency;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CurrencyRepository extends MongoRepository<Currency, String> {
	public Currency findByCode(String code);
}