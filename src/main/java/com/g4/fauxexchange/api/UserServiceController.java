package com.g4.fauxexchange.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;

import com.g4.fauxexchange.service.UserService;
import com.g4.fauxexchange.model.User;

@RestController
public class UserServiceController {
    
    @Autowired
    UserService userService;

    /* Get Users API Call
    JSON Get Request all the users */
    @RequestMapping(value = "/api/user/all", method = RequestMethod.GET)
    public ResponseEntity<Object> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    /* Create User API Call
    JSON Post Request creates the user
    Response created */
    @RequestMapping(value = "/api/user/registration", method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        System.out.println("Creating User - ");
        userService.createUser(user);
        return new ResponseEntity<>("Hello World!", HttpStatus.OK);
    }

    /* Get Leaderboard API Call
    JSON Get Request the leaderboard */
    @RequestMapping(value = "/api/user/leaderboard", method = RequestMethod.GET)
    public ResponseEntity<Object> getLeaderboard() {
        return new ResponseEntity<>(userService.getLeaderboard(), HttpStatus.OK);
    }
    
}