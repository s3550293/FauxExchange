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

import org.json.*;

@RestController
public class SessionsServiceController {

    @RequestMapping(value = "/api/session", method = RequestMethod.GET)
    public ResponseEntity<Object> uid(HttpSession session) {
        JSONObject json = new JSONObject();
        json.put("sessionid", session.getId());

        System.out.println(json.toString());
        return new ResponseEntity<>(json.toString(), HttpStatus.OK);
    }

}