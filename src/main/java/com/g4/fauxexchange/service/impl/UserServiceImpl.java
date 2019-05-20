package com.g4.fauxexchange.service;

import java.util.List;
import java.net.URL;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.g4.fauxexchange.model.User;
import com.g4.fauxexchange.model.UserInfo;
import com.g4.fauxexchange.model.Currency;
import com.g4.fauxexchange.service.UserService;
import com.g4.fauxexchange.dao.UserRepository;
import com.g4.fauxexchange.model.Wallet;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void createUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRole("GENERIC");
        user.createWallet();
        user.createFriendsList();
        userRepository.save(user);
        System.out.println("Created " + user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserInfo getUserInfo(String id) {
        User user = userRepository.findByUserId(id);
        
        UserInfo ui = new UserInfo();
        ui.fName = user.getFName();
        ui.lName = user.getLName();
        ui.rank = "whatever";
        ui.cash = user.getWallet("AUD").getValue();
        return ui;
    }

    @Override
    public List<Wallet> getUserWallet(String id) {
        User user = userRepository.findByUserId(id);
        return user.getWallets();
    }

}