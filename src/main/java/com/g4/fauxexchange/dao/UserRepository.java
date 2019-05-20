package com.g4.fauxexchange.dao;

import java.util.List;

import com.g4.fauxexchange.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends MongoRepository<User, String> {

    @Query(value = "{ 'email': ?0 }")
	public User findByEmail(String email);

    @Query(value = "{ 'userId': ?0 }", fields="{ 'friends': 1 }")
    List<User> findFriends(String userId);


}