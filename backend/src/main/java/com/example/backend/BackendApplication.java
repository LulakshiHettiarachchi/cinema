package com.example.backend;

import com.example.backend.service.kafka.KafkaShowProducerService;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

//	@Bean
//	public CommandLineRunner commandLineRunner(KafkaShowProducerService kafkaShowProducerService) {
//		return args -> {
//			kafkaShowProducerService.sendHardcodedShowMessage();
//		};
//	}

}
