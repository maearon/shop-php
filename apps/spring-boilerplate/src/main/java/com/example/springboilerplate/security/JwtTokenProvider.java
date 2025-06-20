package com.example.springboilerplate.security;

import org.springframework.security.core.AuthenticationException;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.Duration;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret:JWTSuperSecretKey}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs:604800000}")
    private int jwtExpirationInMs; // 7 days in milliseconds

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Instant now = Instant.now();
        Instant expiry = now.plus(Duration.ofDays(7)); // hoặc plusMillis(jwtExpirationInMs)

        Date nowDate = Date.from(now);
        Date expiryDate = Date.from(expiry);
        // Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        // String expiresAt = expiry.toString(); // ISO 8601, giống Ruby

        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(userPrincipal.getId())
                .claim("type", "access")
                .setIssuedAt(nowDate)
                .setExpiration(expiryDate)
                .signWith(key)
                .setHeaderParam("typ", "JWT")
                .compact();
    }

    public String generateRefreshToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Instant now = Instant.now();
        Instant expiry = now.plus(Duration.ofDays(14)); // hoặc plusMillis(jwtExpirationInMs)

        Date nowDate = Date.from(now);
        Date expiryDate = Date.from(expiry);
        // Date expiryDate = new Date(now.getTime() + jwtExpirationInMs * 2L); // 604800000 * 2L = 1209600000 // 14 days in milliseconds

        // String expiresAt = expiry.toString(); // ISO 8601, giống Ruby

        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(userPrincipal.getId())
                .claim("type", "refresh")
                .setIssuedAt(nowDate)
                .setExpiration(expiryDate)
                .signWith(key)
                .setHeaderParam("typ", "JWT")
                .compact();
    }

    public String getUserIdFromJWT(String token) {
    Claims claims = Jwts.parserBuilder()
            .setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8))
            .build()
            .parseClaimsJws(token)
            .getBody();

        return claims.getSubject(); // ✅ trả về String
    }

    public Instant getExpirationFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8))
                .build()
                .parseClaimsJws(token)
                .getBody();
        Date expiration = claims.getExpiration();
        return expiration.toInstant();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8))
                .build()
                .parseClaimsJws(authToken);
            return true;
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
            throw new TokenExpiredException("JWT token has expired");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty");
        }
        return false;
    }

    public class TokenExpiredException extends AuthenticationException {
        public TokenExpiredException(String msg) {
            super(msg);
        }
    }
}
