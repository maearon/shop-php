package com.example.springboilerplate.repository;

import com.example.springboilerplate.model.UserProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface UserProviderRepository extends JpaRepository<UserProvider, UUID> {
    Optional<UserProvider> findByProviderAndProviderUserId(String provider, String providerUserId);
}
