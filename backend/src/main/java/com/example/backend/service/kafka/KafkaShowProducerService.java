package com.example.backend.service.kafka;

import com.example.backend.proto.ShowProtos;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaShowProducerService {

    private final KafkaTemplate<Long, ShowProtos.Show> kafkaTemplate;

//    @Value("${spring.kafka.topic.show}")
    private String topic = "shows";

    public KafkaShowProducerService(KafkaTemplate<Long, ShowProtos.Show> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendShowMessage(Long key, ShowProtos.Show show) {
        kafkaTemplate.send(topic, key, show);
    }

    public void sendHardcodedShowMessage() {
        ShowProtos.Show show = ShowProtos.Show.newBuilder()
                .setShowId(4)
                .setMovieId(7)
                .setShowDate("2024-06-13")
                .setShowTime("10:00")
                .setSeatPrice(1300)
                .setCinemaUserId(653)
                .build();

        sendShowMessage(show.getShowId(), show);
    }
}
