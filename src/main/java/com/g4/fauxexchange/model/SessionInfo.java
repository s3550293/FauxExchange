package com.g4.fauxexchange.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class SessionInfo {

    @Id
    public String sessionId;
    public String userEmail;

    public SessionInfo() {}

    public SessionInfo(String sessionId, String userEmail) {
        this.sessionId = sessionId;
        this.userEmail = userEmail;
    }

    public String getSessionId() {
        return this.sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String toString() {
        return String.format("Session[id=%s, userEmail='%s']", sessionId, userEmail);
    }
}