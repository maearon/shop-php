package com.adidas.auth.service;

import com.adidas.auth.model.PasswordResetToken;
import com.adidas.auth.model.User;

// import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
// @RequiredArgsConstructor
public interface PasswordResetTokenService {
    PasswordResetToken createToken(User user);
    
    Optional<PasswordResetToken> getByToken(String token);
    
    Optional<PasswordResetToken> getByUser(User user);
    
    void deleteToken(PasswordResetToken token);
    
    void deleteExpiredTokens();

    boolean validatePasswordResetToken(String token, String email);
}


