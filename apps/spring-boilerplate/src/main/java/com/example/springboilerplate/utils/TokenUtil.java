package com.example.springboilerplate.utils;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

public class TokenUtil {

    public static String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[30];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public static String generateDigest(String token) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] digest = md.digest(token.getBytes());
            return Base64.getEncoder().encodeToString(digest);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate digest", e);
        }
    }
}
