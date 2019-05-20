package com.g4.fauxexchange.service;

import java.util.List;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.g4.fauxexchange.model.SessionInfo;
import com.g4.fauxexchange.model.User;
import com.g4.fauxexchange.service.SessionInfoService;
import com.g4.fauxexchange.dao.UserRepository;

@Service
public class SessionInfoServiceImpl implements SessionInfoService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public SessionInfo createSession(String sid, String email) {
        SessionInfo si = new SessionInfo();
        si.setSessionId(sid);
        si.setUserEmail(email);
        User user = userRepository.findByEmail(email);
        if(user != null) {
            System.out.println(user.getUserId());
            si.setUserId(user.getUserId());
        }

        return si;
    }

    @Override
    public SessionInfo createSession(HttpSession session) {
        SessionInfo si = new SessionInfo();

        si.setSessionId(session.getId());
        si.setUserEmail((String)session.getAttribute("userEmail"));
        si.setUserId((String)session.getAttribute("userId"));

        return si;
    }

    @Override
    public SessionInfo resetSesssion() {
        return new SessionInfo();
    }
}