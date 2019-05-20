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

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.LinkedList;

import org.json.*;

import com.g4.fauxexchange.model.SessionInfo;
import com.g4.fauxexchange.service.SessionInfoService;
import com.g4.fauxexchange.service.UserService;
import com.g4.fauxexchange.model.User;
import com.g4.fauxexchange.model.UserInfo;

import com.g4.fauxexchange.service.OrderService;

@RestController
public class SessionsServiceController {

    @Autowired
    SessionInfoService sessionInfoService;

    @Autowired
    UserService userService;

    @Autowired
    OrderService orderService;

    @RequestMapping(value = "/api/session", method = RequestMethod.GET)
    public ResponseEntity<Object> getSession(HttpSession session) {
        SessionInfo sessionInfo = sessionInfoService.createSession(session);

        return new ResponseEntity<>(sessionInfo, HttpStatus.OK);
    }

    /* Post Request for Session Creation */
    @RequestMapping(value = "/api/session", method = RequestMethod.POST) 
    public ResponseEntity<Object> createSession(@RequestBody SessionInfo si, HttpSession session) {

        SessionInfo sessionInfo = sessionInfoService.createSession(session.getId(), si.getUserEmail());
        session.setAttribute("userId", sessionInfo.getUserId());
        session.setAttribute("userEmail", sessionInfo.getUserEmail());

        return new ResponseEntity<>("Created Session Successfully", HttpStatus.OK);
    }

    @RequestMapping(value = "/api/session/info", method = RequestMethod.GET) 
    public ResponseEntity<Object> getUserInfo(HttpSession session) {
        System.out.println("User Info Grab");
        String userId = (String)session.getAttribute("userId");
        return new ResponseEntity<>(userService.getUserInfo(userId), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/session/orders", method = RequestMethod.GET) 
    public ResponseEntity<Object> getUserOrders(HttpSession session) {
        System.out.println("User Order Grab");
        String userId = (String)session.getAttribute("userId");
        return new ResponseEntity<>(orderService.getOrdersByUserId(userId), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/session/crypto", method = RequestMethod.GET) 
    public ResponseEntity<Object> getUserCrypto(HttpSession session) {
        System.out.println("User Crypto Grab");
        String userId = (String)session.getAttribute("userId");
        return new ResponseEntity<>(userService.getUserWallet(userId), HttpStatus.OK);
    }

}