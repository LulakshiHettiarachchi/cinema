package com.example.backend.controller;
import com.example.backend.dto.SeatResponseDTO;
import com.example.backend.service.SeatMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/shows")
public class SeatMapController {

    private final SeatMapService seatMapService;

    public SeatMapController(SeatMapService seatMapService) {
        this.seatMapService = seatMapService;
    }

    //This end point is for get the seat map details
    @GetMapping("/view_seats/{showId}")
    public List<SeatResponseDTO> viewSeatMap(@PathVariable Long showId) throws Exception {
        return seatMapService.getSeatMap(showId);
    }


}