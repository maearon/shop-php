package com.example.springboilerplate.dto;

import com.example.springboilerplate.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private User user;
    private Tokens tokens;

    @Data
    @AllArgsConstructor
    public static class Tokens {
        private String token;
        private String refresh;
    }

    public AuthResponse(User user, String token, String refresh) {
        this.user = user;
        this.tokens = new Tokens(token, refresh);
    }
}
