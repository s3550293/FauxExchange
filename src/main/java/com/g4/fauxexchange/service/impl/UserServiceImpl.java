package com.g4.fauxexchange.service;

import java.util.List;
import java.net.URL;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.g4.fauxexchange.model.User;
import com.g4.fauxexchange.model.Wallet;
import com.g4.fauxexchange.model.UserInfo;
import com.g4.fauxexchange.service.UserService;
import com.g4.fauxexchange.dao.UserRepository;


//Currency related
import com.g4.fauxexchange.model.Currency;
import com.g4.fauxexchange.model.Price;
import com.g4.fauxexchange.service.CurrencyService;
import com.g4.fauxexchange.dao.CurrencyRepository;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository uRepo;

    @Autowired
    private CurrencyRepository cRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void createUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRole("GENERIC");
        user.createWallet();
        user.createFriendsList();
        uRepo.save(user);
        System.out.println("Created " + user);
    }

    @Override
    public void deleteUser(User user) {
        uRepo.delete(user);
    }

    @Override
    @Scheduled(fixedRate = 60000, initialDelay = 60000)
    public void updateUser() {
        System.out.println("- Updating Wallets -");
        for(User user : uRepo.findAll()) {
            if(!user.getWallets().isEmpty()) {
                for(Wallet wallet : user.getWallets()) {
                    if(!wallet.getCode().equals("AUD")) {
                        wallet.setPrice(cRepo.findByCode(wallet.getCode()).getRecentPrice());
                        wallet.setValue(wallet.getPrice() * wallet.getQty());   
                    }
                }
                uRepo.save(user);
                System.out.println("Updated: " + user.getUserId());
            }
        }
    }

    @Override
    public void saveUser(User user) {
        uRepo.save(user);
    }

    @Override
    public List<User> getUsers() {
        return uRepo.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return uRepo.findByEmail(email);
    }

    @Override
    public UserInfo getUserInfo(String id) {
        User user = uRepo.findByUserId(id);
        
        UserInfo ui = new UserInfo();
        ui.fName = user.getFName();
        ui.lName = user.getLName();
        ui.rank = "whatever";
        ui.cash = user.getWallet("AUD").getValue();
        return ui;
    }

    @Override
    public List<Wallet> getUserWallet(String id) {
        User user = uRepo.findByUserId(id);
        return user.getWallets();
    }

}