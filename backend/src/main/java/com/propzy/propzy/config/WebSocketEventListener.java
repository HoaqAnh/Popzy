package com.propzy.propzy.config;


import com.propzy.propzy.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Component
public class WebSocketEventListener {
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    public WebSocketEventListener(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        logger.info("Received a new web socket connection");
    }

}
