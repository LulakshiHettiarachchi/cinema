package com.example.backend.repository;
import com.example.backend.model.Reservation;
import com.example.backend.model.Show;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByShow(Show show);
}
