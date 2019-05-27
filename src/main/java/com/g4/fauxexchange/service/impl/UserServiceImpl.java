package com.g4.fauxexchange.service;

import java.util.LinkedList;
import java.util.List;
import java.net.URL;
import java.util.Collections;
import java.util.Comparator;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.g4.fauxexchange.model.User;
import com.g4.fauxexchange.model.LeaderboardInfo;
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

    @Override
    public List<LeaderboardInfo> getLeaderboard() {
        List<User> users = uRepo.findAll();
        LinkedList<LeaderboardInfo> leaderboards = new LinkedList<LeaderboardInfo>();
        for(User u : users) {
            LeaderboardInfo person = new LeaderboardInfo(u.getFName() + " " + u.getLName(), 0, u.getWalletsValue());
            leaderboards.add(person);
        }

        Collections.sort(leaderboards, new Comparator<LeaderboardInfo>() { 
                @Override 
                public int compare(LeaderboardInfo s1, LeaderboardInfo s2) { 
                    if(s1.getValue() < s2.getValue()) {
                        return 1;
                    } else {
                        return -1;
                    }
                } 
            });

        int index = 0;
        for(LeaderboardInfo li : leaderboards) {
            li.setRank(index + 1);
            leaderboards.set(index, li);
            index++;
        }

        return leaderboards;
    }

    @Override
    public void addFriends(String userId, String email) {
        User user = uRepo.findByUserId(userId);
        user.addFriend(email);
        uRepo.save(user);
    }

    @Override
    public List<LeaderboardInfo> getFriends(String userId) {
        User user = uRepo.findByUserId(userId);
        List<LeaderboardInfo> leaderboard = getLeaderboard();
        LinkedList<LeaderboardInfo> friends = new LinkedList<LeaderboardInfo>();

        for(String email : user.getFriendsList()) {
            User f = uRepo.findByEmail(email);
            for(LeaderboardInfo li : leaderboard) {
                if(f != null) {
                    if(li.getName().equals(f.getFName() +" "+ f.getLName())) {
                        friends.add(li);
                    }
                }
            }
        }

        return friends;
    }

}