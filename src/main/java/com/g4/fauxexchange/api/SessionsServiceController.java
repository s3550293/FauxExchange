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

@RestController
public class SessionsServiceController {

    @Autowired
    SessionInfoService sessionInfoService;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/api/session", method = RequestMethod.GET)
    public ResponseEntity<Object> getSession(HttpSession session) {
        // System.out.println(session);
        // JSONObject json = new JSONObject();
        // json.put("sessionId", session.getId());
        // json.put("userEmail", (String)session.getAttribute("userEmail"));

        // System.out.println(json.toString());

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

    @RequestMapping(value = "/api/session/userinfo", method = RequestMethod.POST) 
    public ResponseEntity<Object> getUserInfo(@RequestBody SessionInfo si, HttpSession session) {
        System.out.println("Hello We are trying to get system info");
        User user = userService.getUserInfo(si.getUserId());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}