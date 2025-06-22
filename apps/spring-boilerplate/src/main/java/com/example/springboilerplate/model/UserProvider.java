package com.example.springboilerplate.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.time.Instant;
import java.util.UUID;

@Data
@Entity
@Table(name = "user_providers", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"provider", "providerUserId"})
})
public class UserProvider {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String provider;
    @Column(name = "provider_user_id")
    private String providerUserId;
    private String email;
    private String name;
    @Column(name = "avatar_url")
    private String avatarUrl;
    @Column(name = "access_token")
    private String accessToken;
    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "raw_data", columnDefinition = "jsonb")
    private String rawData;

    @Column(name = "created_at")
    private Instant createdAt;
    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}
