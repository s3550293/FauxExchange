package com.g4.fauxexchange.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// This class is used for manipulation of data for the front end

@Document
public class SessionInfo {

    @Id
    public String sessionId;
    public String userId;
    public String userEmail;

    public SessionInfo() {}

    public SessionInfo(String sessionId, String userId) {
        this.sessionId = sessionId;
        this.userId = userId;
    }

    public String getSessionId() {
        return this.sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String toString() {
        return String.format("Session[id=%s, userId='%s']", sessionId, userId);
    }
}