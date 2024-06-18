package com.example.backend.model;
import jakarta.persistence.*;
import lombok.*;


@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="section")
public class SeatMap {
    @Id
    private Long sectionId;
    private Integer columns;
    @Column(name = "num_rows")
    private Integer numRows;
    private Integer startColumnNumber;
    private Integer endColumnNumber;
    private String startRowNumber;
    private String endRowNumber;

    @ManyToOne
    @JoinColumn(name = "cinema_user_id", nullable = false)
    private CinemaUser cinemaUser;

}
