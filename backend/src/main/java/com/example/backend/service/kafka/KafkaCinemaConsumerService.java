package com.example.backend.service.kafka;
import com.example.backend.model.CinemaUser;
import com.example.backend.proto.CinemaProtos;
import com.example.backend.repository.CinemaUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KafkaCinemaConsumerService {

    private final CinemaUserRepository cinemaUserRepository;

    public KafkaCinemaConsumerService(CinemaUserRepository cinemaUserRepository) {
        this.cinemaUserRepository = cinemaUserRepository;
    }

    @KafkaListener(topics = "cinema", groupId = "cinema1-group", containerFactory = "cinemaKafkaListenerContainerFactory")
    public void consumeCinema(ConsumerRecord<Long, CinemaProtos.Cinema> record) {
        log.info("Consumed Cinema message: {}", record.value());
        System.out.println(record.value());
        CinemaProtos.Cinema cinemaProto = record.value();

        // Convert CinemaProtos.Cinema to Cinema entity
        CinemaUser cinema = convertProtoToEntity(cinemaProto);

        // Save to the database
        cinemaUserRepository.save(cinema);
        log.info("Saved cinema to repository: {}", cinema);
    }

    private CinemaUser convertProtoToEntity(CinemaProtos.Cinema cinemaProto) {
        CinemaUser cinema = new CinemaUser();

        cinema.setId((int) cinemaProto.getCinemaId());
        cinema.setCinemaUserName(cinemaProto.getCinemaUserName());
        return cinema;
    }
}
