package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MovieResponseDTO {
    private Long id;
    private String name;
    private String releaseDate;
    private String description;
    private Long hours;
    private Long minutes;
    private String language;
    private byte[] imageData;
}
