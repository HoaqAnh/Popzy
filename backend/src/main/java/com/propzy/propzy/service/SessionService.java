package com.propzy.propzy.service;


import com.propzy.propzy.domain.Session;
import com.propzy.propzy.domain.User;
import com.propzy.propzy.repository.SessionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SessionService {
    private final SessionRepository sessionRepository;


    @Transactional
    public Session createSession(User user, String refreshToken, String deviceInfo, String ip, long expirySeconds) {
        var now = Instant.now();
        var session = Session.builder()
                .user(user)
                .refreshToken(refreshToken)
                .deviceInfo(deviceInfo)
                .ip(ip)
                .createdAt(now)
                .expiresAt(now.plusSeconds(expirySeconds))
                .build();
        return sessionRepository.save(session);
    }

    @Transactional
    public Session rotateRefreshToken(Session session, String newRefreshToken, long expirySeconds) {
        session.setRefreshToken(newRefreshToken);
        session.setExpiresAt(Instant.now().plusSeconds(expirySeconds));
        return sessionRepository.save(session);
    }

    @Transactional
    public void revokeByRefreshToken(String refreshToken) {
        sessionRepository.deleteByRefreshToken(refreshToken);
    }
    public Optional<Session> findByRefreshToken(String refreshToken) {
        return this.findByRefreshToken((refreshToken));
    }
}