package com.g4.fauxexchange.dao;

import java.util.List;

import com.g4.fauxexchange.model.Users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsersRepository extends MongoRepository<Users, String> {

    @Query(value = "{ 'email': ?0 }")
	public List<Users> findByEmail(String email);
}