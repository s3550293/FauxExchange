package com.g4.fauxexchange.service;

import java.util.List;
import com.g4.fauxexchange.model.User;
import com.g4.fauxexchange.model.UserInfo;
import com.g4.fauxexchange.model.Wallet;

public interface UserService {
    public abstract void createUser(User user);
    public abstract void deleteUser(User user);
    public abstract List<User> getUsers();
    public abstract User getUserByEmail(String email);
    public abstract UserInfo getUserInfo(String id);
    public abstract List<Wallet> getUserWallet(String id);
    public abstract void saveUser(User user);
}