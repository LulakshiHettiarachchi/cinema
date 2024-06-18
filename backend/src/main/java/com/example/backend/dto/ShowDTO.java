package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowDTO {
    private Long showID;
    private String cinemaUserName;
    private Long seatPrice;
    private String showDate;
    private String showTime;
}
