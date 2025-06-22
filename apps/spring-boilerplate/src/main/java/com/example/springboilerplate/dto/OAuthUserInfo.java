package com.example.springboilerplate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuthUserInfo {
    private String provider;         // "google", "facebook"
    private String providerUserId;   // sub hoặc id
    private String email;
    private String name;
    private String avatarUrl;
    private String accessToken;
    private String refreshToken;
    private String rawJson;
}
