package com.example.springboilerplate.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponseDto {
    private UserDto user;
    private TokenGroupDto tokens;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserDto {
        private String id;
        private String email;
        private String name;
        private boolean admin;
        private String avatarUrl; // ✅ thêm dòng này nếu thiếu
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TokenGroupDto {
        private TokenDto access;
        private TokenDto refresh;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TokenDto {
        private String token;
        private Instant expires; // UNIX to ISO string
    }
}
