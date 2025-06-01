package com.myrecipebook.backend.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email); // Om du vill kunna logga in med email
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
