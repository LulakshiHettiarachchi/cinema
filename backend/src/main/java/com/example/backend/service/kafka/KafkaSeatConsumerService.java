package com.example.backend.service.kafka;

import com.example.backend.model.SeatMap;
import com.example.backend.model.CinemaUser;
import com.example.backend.proto.SeatProtos;
import com.example.backend.repository.MovieRepository;
import com.example.backend.repository.SeatMapRepository;
import com.example.backend.repository.CinemaUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KafkaSeatConsumerService {

    private final SeatMapRepository seatMapRepository;
    private final CinemaUserRepository cinemaUserRepository;

    public KafkaSeatConsumerService(SeatMapRepository seatMapRepository, CinemaUserRepository cinemaUserRepository) {
        this.seatMapRepository = seatMapRepository;
        this.cinemaUserRepository = cinemaUserRepository;
    }

    @KafkaListener(topics = "seat", groupId = "seat1-group", containerFactory = "seatKafkaListenerContainerFactory")
    public void consumeSeat(ConsumerRecord<Long, SeatProtos.Seat> record) {
        log.info("Consumed Seat message: {}", record.value());
        SeatProtos.Seat seatProto = record.value();

        // Convert SeatProtos.Seat to SeatMap entity
        SeatMap seatMap = convertProtoToEntity(seatProto);

        // Save to the database
        seatMapRepository.save(seatMap);
        log.info("Saved seat map to repository: {}", seatMap);
    }

    private SeatMap convertProtoToEntity(SeatProtos.Seat seatProto) {

        CinemaUser cinemaUser = cinemaUserRepository.findById(seatProto.getId()).orElseThrow(() -> new IllegalArgumentException("CinemaUser not found"));

        return SeatMap.builder()
                .sectionId(seatProto.getSectionId())
                .columns(seatProto.getColumns())
                .numRows(seatProto.getNumRows())
                .startColumnNumber(seatProto.getStartColumnNumber())
                .endColumnNumber(seatProto.getEndColumnNumber())
                .startRowNumber(seatProto.getStartRowNumber())
                .endRowNumber(seatProto.getEndRowNumber())
                .cinemaUser(cinemaUser)
                .build();
    }
}
