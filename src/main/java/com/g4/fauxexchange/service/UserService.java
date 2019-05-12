package com.g4.fauxexchange.service;

import java.util.List;
import com.g4.fauxexchange.model.User;

public interface UserService {
    public abstract void createUser(User user);
    public abstract void updateUser(User user);
    public abstract void deleteUser(User user);
    public abstract List<User> getUsers();
    public abstract List<User> getUserByEmail(String email);
}