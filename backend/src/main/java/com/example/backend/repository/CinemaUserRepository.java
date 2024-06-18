package com.example.backend.repository;

import com.example.backend.model.CinemaUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaUserRepository extends JpaRepository<CinemaUser,Long> {

}
