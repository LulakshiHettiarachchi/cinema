
//package com.example.backend.controller.kafka;
//import com.example.backend.model.Movie;
//import com.example.backend.service.kafka.MovieService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("api/movies")
//public class MovieController {
//
//    @Autowired
//    private MovieService movieService;
//
//    @GetMapping("/all")
//    public List<Movie> getAllMovies() {
//        return movieService.getAllMovies();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
//        return movieService.getMovieById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public Movie createMovie(@RequestBody Movie movie) {
//        return movieService.saveMovie(movie);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie updatedMovie) {
//        return ResponseEntity.ok(movieService.updateMovie(id, updatedMovie));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
//        movieService.deleteMovie(id);
//        return ResponseEntity.noContent().build();
//    }
//}
package com.example.backend.controller.kafka;


import com.example.backend.dto.MovieResponseDTO;
import com.example.backend.model.Movie;
import com.example.backend.service.kafka.MovieService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/all")
    public List<MovieResponseDTO> getAllMovies() {
        return movieService.getAllMovies().stream()
                .map(movie -> modelMapper.map(movie, MovieResponseDTO.class))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieResponseDTO> getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id)
                .map(movie -> ResponseEntity.ok(modelMapper.map(movie, MovieResponseDTO.class)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MovieResponseDTO createMovie(@RequestBody MovieResponseDTO movieDTO) {
        Movie movie = modelMapper.map(movieDTO, Movie.class);
        Movie savedMovie = movieService.saveMovie(movie);
        return modelMapper.map(savedMovie, MovieResponseDTO.class);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieResponseDTO> updateMovie(@PathVariable Long id, @RequestBody MovieResponseDTO updatedMovieDTO) {
        Movie updatedMovie = modelMapper.map(updatedMovieDTO, Movie.class);
        Movie savedMovie = movieService.updateMovie(id, updatedMovie);
        return ResponseEntity.ok(modelMapper.map(savedMovie, MovieResponseDTO.class));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }
}
