package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "cinema_user")
public class CinemaUser {
    @Getter
    @Setter
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "cinema_username")
    private String cinemaUserName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCinemaUserName() {
        return cinemaUserName;
    }

    public void setCinemaUserName(String cinemaUserName) {
        this.cinemaUserName = cinemaUserName;
    }


}
