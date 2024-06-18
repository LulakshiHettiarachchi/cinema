package com.example.backend.controller;

import com.example.backend.dto.ShowDTO;
import com.example.backend.service.ShowService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/shows")
public class ShowController {

    private final ShowService showService;

    public ShowController(ShowService showService) {
        this.showService = showService;
    }

    @GetMapping("/movie/{movieId}/date/{showDate}")
    public List<ShowDTO> getShowTimes(@PathVariable Long movieId, @PathVariable String showDate) {
        return showService.getShowsByMovieIdAndDate(movieId, showDate);
    }
}
