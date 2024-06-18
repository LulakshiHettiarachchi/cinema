package com.example.backend.service.kafka;

import com.example.backend.model.CinemaUser;
import com.example.backend.model.Movie;
import com.example.backend.model.Show;
import com.example.backend.proto.ShowProtos;
import com.example.backend.repository.CinemaUserRepository;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.ShowRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KafkaShowConsumerService {

    private final ShowRepository showRepository;
    private final MovieRepository movieRepository;
    private final CinemaUserRepository cinemaUserRepository;

    public KafkaShowConsumerService(ShowRepository showRepository, MovieRepository movieRepository, CinemaUserRepository cinemaUserRepository) {
        this.showRepository = showRepository;
        this.movieRepository = movieRepository;
        this.cinemaUserRepository = cinemaUserRepository;
    }

    @KafkaListener(topics = "shows", groupId = "show1-group", containerFactory = "showKafkaListenerContainerFactory")
    public void consumeShow(ConsumerRecord<Long, ShowProtos.Show> record) {
        log.info("Consumed Show message: {}", record.value());
        System.out.println(record.value());
        ShowProtos.Show showProto = record.value();

        // Convert ShowProtos.Show to Show entity
        Show show = convertProtoToEntity(showProto);

        // Save to the database
        showRepository.save(show);
        log.info("Saved show to repository: {}", show);
    }

    private Show convertProtoToEntity(ShowProtos.Show showProto) {
        Show show = new Show();
        show.setShowID(showProto.getShowId());

        Movie movie = movieRepository.findById(Long.valueOf(showProto.getMovieId()))
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + showProto.getMovieId()));
        show.setMovie(movie);

        CinemaUser cinemaUser = cinemaUserRepository.findById(Long.valueOf(showProto.getCinemaUserId()))
                .orElseThrow(() -> new RuntimeException("Cinema user not found with ID: " + showProto.getCinemaUserId()));
        show.setCinemaUser(cinemaUser);

        show.setShowDate(showProto.getShowDate());
        show.setShowTime(showProto.getShowTime());
        show.setSeatPrice(showProto.getSeatPrice());


        return show;
    }
}
