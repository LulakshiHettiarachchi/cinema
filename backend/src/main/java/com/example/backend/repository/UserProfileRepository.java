package com.example.backend.repository;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserProfileRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
}
