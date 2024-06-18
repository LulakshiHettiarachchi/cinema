package com.example.backend.repository;
import com.example.backend.model.CinemaUser;
import com.example.backend.model.SeatMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatMapRepository extends JpaRepository<SeatMap,Long> {
    List<SeatMap> findAllByCinemaUser(CinemaUser cinemaUser);
}




