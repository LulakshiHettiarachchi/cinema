package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "movie_show")
public class Show {
    @Id
    private Long showID;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    @JsonBackReference
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "cinema_user_id", nullable = false)
    @JsonBackReference
    private CinemaUser cinemaUser;

    @Column(name = "show_date", nullable = false)
    private String showDate;

    public Long getShowID() {
        return showID;
    }

    public void setShowID(Long showID) {
        this.showID = showID;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public CinemaUser getCinemaUser() {
        return cinemaUser;
    }

    public void setCinemaUser(CinemaUser cinemaUser) {
        this.cinemaUser = cinemaUser;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public String getShowTime() {
        return showTime;
    }

    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }

    public Long getSeatPrice() {
        return seatPrice;
    }

    public void setSeatPrice(Long seatPrice) {
        this.seatPrice = seatPrice;
    }

    @Column(name = "show_time", nullable = false)
    private String showTime;

    @Column(name = "seat_price", nullable = false)
    private Long seatPrice;



}
