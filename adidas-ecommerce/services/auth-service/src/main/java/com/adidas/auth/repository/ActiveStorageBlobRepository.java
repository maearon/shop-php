package com.adidas.auth.repository;

import com.adidas.auth.model.ActiveStorageBlob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActiveStorageBlobRepository extends JpaRepository<ActiveStorageBlob, Long> {
    Optional<ActiveStorageBlob> findByKey(String key);
}
