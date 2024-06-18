package com.example.backend.service;

import com.example.backend.dto.SeatResponseDTO;
import com.example.backend.model.CinemaUser;
import com.example.backend.model.SeatMap;
import com.example.backend.model.Show;
import com.example.backend.repository.CinemaUserRepository;
import com.example.backend.repository.SeatMapRepository;
import com.example.backend.repository.ShowRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SeatMapService {
    private final SeatMapRepository seatMapRepository;
    private final ShowRepository showRepository;
    private final CinemaUserRepository cinemaUserRepository;

    public SeatMapService(SeatMapRepository seatMapRepository, ShowRepository showRepository, CinemaUserRepository cinemaUserRepository) {
        this.seatMapRepository = seatMapRepository;
        this.showRepository = showRepository;
        this.cinemaUserRepository = cinemaUserRepository;
    }

    public List<SeatResponseDTO> getSeatMap(Long showId) throws Exception {
        Show show = showRepository.findById(showId)
                .orElseThrow(() -> new IllegalArgumentException("Show not found"));

        // Assuming Show entity has a method to get associated CinemaUser
        CinemaUser cinemaUser = show.getCinemaUser();

        if (cinemaUser == null) {
            throw new IllegalArgumentException("Cinema user not found for the show");
        }

        List<SeatMap> sections = seatMapRepository.findAllByCinemaUser(cinemaUser);

        if (sections.isEmpty()) {
            throw new IllegalArgumentException("Sections not found");
        }

        return sections.stream()
                .map(section -> new SeatResponseDTO(
                        section.getSectionId(),
                        section.getColumns(),
                        section.getNumRows(),
                        section.getStartColumnNumber(),
                        section.getEndColumnNumber(),
                        section.getStartRowNumber(),
                        section.getEndRowNumber()))
                .collect(Collectors.toList());
    }
}
