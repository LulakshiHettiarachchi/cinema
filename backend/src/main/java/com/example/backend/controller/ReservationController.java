package com.example.backend.controller;
import com.example.backend.dto.AvailabilityRequestDTO;
import com.example.backend.dto.ReservationRequestDTO;
import com.example.backend.model.Reservation;
import com.example.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    //This is for get the booked seat when load the seat map.still user is not logged.no need to pass the user id.
    @GetMapping("shows/get_booked_seats/{showId}")
    public List<String> getBookedSeats(@PathVariable Long showId) {
        return reservationService.getBookedSeats(showId);
    }



//When seat selection done.After click on proceed button it  should ask to login.Now it has authorization header.
//When user click on the payment button then again it should check the availability.
//it should return is this seats are still available for this u
    @PostMapping("auth/check_availability")
    public Boolean checkSeatAvailability (@RequestBody AvailabilityRequestDTO availabilityRequestDTO) {
        return reservationService.checkSeatAvailability(availabilityRequestDTO);
    }


//    This is for get the reservation success message after do the payment and all.
//    Permenetly book the seat and do confirm the reservation
//    This request has the show id with booked seat with auth header
    @PostMapping("auth/reservation_confirm_payment")
    public Boolean bookSeats(@RequestBody ReservationRequestDTO reservationRequestDTO) {
        System.out.println(reservationRequestDTO);
        return reservationService.reservationConfirm(reservationRequestDTO);
    }



}
