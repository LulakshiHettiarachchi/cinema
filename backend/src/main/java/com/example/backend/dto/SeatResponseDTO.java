

package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatResponseDTO {
    private Long sectionId;
    private Integer columns;
    private Integer numRows;
    private Integer startColumnNumber;
    private Integer endColumnNumber;
    private String startRowNumber;
    private String endRowNumber;


}
