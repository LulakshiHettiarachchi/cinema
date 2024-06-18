package com.example.backend.service;

import com.example.backend.dto.ShowDTO;
import com.example.backend.model.CinemaUser;
import com.example.backend.model.Show;
import com.example.backend.repository.CinemaUserRepository;
import com.example.backend.repository.ShowRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShowService {

    private final ShowRepository showRepository;
    private final CinemaUserRepository cinemaUserRepository;
    private final ModelMapper modelMapper;

    public ShowService(ShowRepository showRepository, CinemaUserRepository cinemaUserRepository, ModelMapper modelMapper) {
        this.showRepository = showRepository;
        this.cinemaUserRepository = cinemaUserRepository;
        this.modelMapper = modelMapper;
    }

    public List<ShowDTO> getShowsByMovieIdAndDate(Long movieId, String showDate) {
        List<Show> shows = showRepository.findByMovieIdAndShowDate(movieId, showDate);

        return shows.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ShowDTO convertToDto(Show show) {
        ShowDTO dto = modelMapper.map(show, ShowDTO.class);

        Optional<CinemaUser> cinemaUserOptional = cinemaUserRepository.findById(Long.valueOf(show.getCinemaUser().getId()));
        cinemaUserOptional.ifPresent(cinemaUser -> dto.setCinemaUserName(cinemaUser.getCinemaUserName()));

        return dto;
    }
}

