package com.example.backend.config;

import com.example.backend.proto.CinemaProtos;
import com.example.backend.proto.MovieProtos;
import com.example.backend.proto.SeatProtos;
import com.example.backend.proto.ShowProtos;
import io.confluent.kafka.serializers.protobuf.KafkaProtobufDeserializer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConsumerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${spring.kafka.consumer.group-id}")
    private String groupId;

    @Value("${spring.kafka.properties.schema.registry.url}")
    private String schemaRegistryUrl;

    @Value("${spring.kafka.properties.basic.auth.credentials.source}")
    private String basicAuthCredentialsSource;

    @Value("${spring.kafka.properties.basic.auth.user.info}")
    private String basicAuthUserInfo;

    @Value("${spring.kafka.properties.sasl.jaas.config}")
    private String saslJaasConfig;

    private Map<String, Object> consumerConfigs() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        config.put(ErrorHandlingDeserializer.KEY_DESERIALIZER_CLASS, LongDeserializer.class.getName());
        config.put("schema.registry.url", schemaRegistryUrl);
        config.put("basic.auth.credentials.source", basicAuthCredentialsSource);
        config.put("basic.auth.user.info", basicAuthUserInfo);
        config.put("security.protocol", "SASL_SSL");
        config.put("sasl.mechanism", "PLAIN");
        config.put("sasl.jaas.config", saslJaasConfig);
//        config.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        return config;
    }

    private <T> ConsumerFactory<Long, T> createConsumerFactory(Class<T> clazz) {
        Map<String, Object> config = consumerConfigs();
        config.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, KafkaProtobufDeserializer.class.getName());
        config.put("specific.protobuf.value.type", clazz.getName());
        return new DefaultKafkaConsumerFactory<>(config);
    }

    private <T> ConcurrentKafkaListenerContainerFactory<Long, T> createKafkaListenerContainerFactory(Class<T> clazz) {
        ConcurrentKafkaListenerContainerFactory<Long, T> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(createConsumerFactory(clazz));
        return factory;
    }


    @Bean
    public ConsumerFactory<Long, MovieProtos.Movie> movieConsumerFactory() {
        return createConsumerFactory(MovieProtos.Movie.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<Long, MovieProtos.Movie> movieKafkaListenerContainerFactory() {
        return createKafkaListenerContainerFactory(MovieProtos.Movie.class);
    }


    @Bean
    public ConsumerFactory<Long, ShowProtos.Show> showConsumerFactory() {
        return createConsumerFactory(ShowProtos.Show.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<Long, ShowProtos.Show> showKafkaListenerContainerFactory() {
        return createKafkaListenerContainerFactory(ShowProtos.Show.class);
    }
    @Bean
    public ConsumerFactory<Long, SeatProtos.Seat> seatConsumerFactory() {
        return createConsumerFactory(SeatProtos.Seat.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<Long, SeatProtos.Seat> seatKafkaListenerContainerFactory() {
        return createKafkaListenerContainerFactory(SeatProtos.Seat.class);
    }
    @Bean
    public ConsumerFactory<Long, CinemaProtos.Cinema> cinemaConsumerFactory() {
        return createConsumerFactory(CinemaProtos.Cinema.class);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<Long, CinemaProtos.Cinema> cinemaKafkaListenerContainerFactory() {
        return createKafkaListenerContainerFactory(CinemaProtos.Cinema.class);
    }
}
