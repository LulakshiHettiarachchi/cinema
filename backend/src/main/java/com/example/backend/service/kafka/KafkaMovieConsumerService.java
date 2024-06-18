//package com.example.backend.service;
//
//import com.example.backend.proto.MovieProtos;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.kafka.clients.consumer.ConsumerRecord;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Slf4j
//@Service
//public class KafkaMovieConsumerService {
//
//    private final List<MovieProtos.Movie> movies = new ArrayList<>();
//
//    @KafkaListener(topics = "movie", groupId = "movie-group", containerFactory = "movieKafkaListenerContainerFactory")
//    public void consumeMovie(ConsumerRecord<Long, MovieProtos.Movie> record) {
//        log.info("Consumed Movie message: {}", record.value());
//        synchronized (movies) {
//            movies.add(record.value());
//
//        }
//    }
//
//    public List<MovieProtos.Movie> getMovies() {
//        synchronized (movies) {
//            return new ArrayList<>(movies);
//        }
//    }
//}
//package com.example.backend.service.kafka;
//
//import com.example.backend.model.Movie;
//import com.example.backend.proto.MovieProtos;
//import com.example.backend.repository.MovieRepository;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.kafka.clients.consumer.ConsumerRecord;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Slf4j
//@Service
//public class KafkaMovieConsumerService {
//
//    private final List<MovieProtos.Movie> movies = new ArrayList<>();
//
//    @Autowired
//    private MovieRepository movieRepository;
//
//    @KafkaListener(topics = "movie", groupId = "movie-group", containerFactory = "movieKafkaListenerContainerFactory")
//    public void consumeMovie(ConsumerRecord<Long, MovieProtos.Movie> record) {
//
//        log.info("Consumed Movie message: {}", record.value());
//        System.out.println(record.value());
//        MovieProtos.Movie movieProto = record.value();
//
//        // Convert MovieProtos.Movie to Movie entity
//        Movie movie = new Movie();
//        movie.setId(movieProto.getId());
//        movie.setName(movieProto.getName());
//        movie.setReleaseDate(movieProto.getReleaseDate());
//        movie.setDescription(movieProto.getDescription());
//        movie.setHours(movieProto.getHours());
//        movie.setMinutes(movieProto.getMinutes());
//        movie.setLanguage(movieProto.getLanguage());
//        movie.setImageData(movieProto.getImageData().toByteArray());
//
//        // Save to the database
//        movieRepository.save(movie);
//
//        synchronized (movies) {
//            movies.add(movieProto);
//        }
//    }
//
//    public List<MovieProtos.Movie> getMovies() {
//        synchronized (movies) {
//            return new ArrayList<>(movies);
//        }
//    }
//}
//package com.example.backend.service.kafka;
//
//import com.example.backend.model.Movie;
//import com.example.backend.proto.MovieProtos;
//import com.example.backend.repository.MovieRepository;
//import lombok.extern.slf4j.Slf4j;
//import org.apache.kafka.clients.consumer.ConsumerRecord;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//
//@Slf4j
//@Component
//public class KafkaMovieConsumerService {
//
//    private final List<MovieProtos.Movie> movies = new ArrayList<>();
//    private static final String DATE_FORMAT = "yyyy-MM-dd"; // Define the date format
//
//    @Autowired
//    private MovieRepository movieRepository;
//
//    @KafkaListener(topics = "movie", groupId = "movie-group", containerFactory = "movieKafkaListenerContainerFactory")
//    public void consumeMovie(ConsumerRecord<Long, MovieProtos.Movie> record) {
//
//        log.info("Consumed Movie message: {}", record.value());
//        System.out.println(record.value());
//        MovieProtos.Movie movieProto = record.value();
//
//        // Convert MovieProtos.Movie to Movie entity
//        Movie movie = new Movie();
//        movie.setId(movieProto.getId());
//        movie.setName(movieProto.getName());
//
//        // Convert the release date string to a Date object
//        try {
//            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
//            Date releaseDate = sdf.parse(movieProto.getReleaseDate());
//            movie.setReleaseDate(releaseDate);
//        } catch (ParseException e) {
//            e.printStackTrace();
//            log.error("Failed to parse release date: {}", movieProto.getReleaseDate(), e);
//            // Handle parse exception, maybe set a default date or skip setting the date
//            movie.setReleaseDate(null); // or some default value
//        }
//
//        movie.setDescription(movieProto.getDescription());
//        movie.setHours(movieProto.getHours());
//        movie.setMinutes(movieProto.getMinutes());
//        movie.setLanguage(movieProto.getLanguage());
//        movie.setImageData(movieProto.getImageData().toByteArray());
//
//        // Save to the database
//        movieRepository.save(movie);
//
//        synchronized (movies) {
//            movies.add(movieProto);
//        }
//    }
//
//    public List<MovieProtos.Movie> getMovies() {
//        synchronized (movies) {
//            return new ArrayList<>(movies);
//        }
//    }
//}
package com.example.backend.service.kafka;

import com.example.backend.model.Movie;
import com.example.backend.proto.MovieProtos;
import com.example.backend.repository.MovieRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
public class KafkaMovieConsumerService {

    private final List<MovieProtos.Movie> movies = new ArrayList<>();
    private static final String DATE_FORMAT = "yyyy-MM-dd"; // Define the date format
    private final MovieRepository movieRepository;

    public KafkaMovieConsumerService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @KafkaListener(topics = "movie", groupId = "movie-group3", containerFactory = "movieKafkaListenerContainerFactory")
    public void consumeMovie(ConsumerRecord<Long, MovieProtos.Movie> record) {
        log.info("Consumed Movie message: {}", record.value());
        System.out.println(record.value());
        MovieProtos.Movie movieProto = record.value();

        // Convert MovieProtos.Movie to Movie entity
        Movie movie = convertProtoToEntity(movieProto);

        // Save to the database
        movieRepository.save(movie);
        log.info("Saved movie to repository: {}", movie);

        synchronized (movies) {
            movies.add(movieProto);
        }
    }

    private Movie convertProtoToEntity(MovieProtos.Movie movieProto) {
        Movie movie = new Movie();
        movie.setId(movieProto.getId());
        movie.setName(movieProto.getName());

        // Convert the release date string to a Date object
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
            Date releaseDate = sdf.parse(movieProto.getReleaseDate());
            movie.setReleaseDate(releaseDate);
        } catch (ParseException e) {
            e.printStackTrace();
            log.error("Failed to parse release date: {}", movieProto.getReleaseDate(), e);
            // Handle parse exception, maybe set a default date or skip setting the date
            movie.setReleaseDate(null); // or some default value
        }

        movie.setDescription(movieProto.getDescription());
        movie.setHours(movieProto.getHours());
        movie.setMinutes(movieProto.getMinutes());
        movie.setLanguage(movieProto.getLanguage());
        movie.setImageData(movieProto.getImageData().toByteArray());

        return movie;
    }

    public List<MovieProtos.Movie> getMovies() {
        synchronized (movies) {
            return new ArrayList<>(movies);
        }
    }
}
