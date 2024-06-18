package com.example.backend.service;

import com.example.backend.dto.AvailabilityRequestDTO;
import com.example.backend.dto.ReservationRequestDTO;
import com.example.backend.grpc.GrpcClient;
import com.example.backend.model.User;
import com.example.backend.repository.ReservationRepository;
import com.example.backend.repository.ShowRepository;
import com.example.backend.repository.UserRepository;
import com.server.proto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private GrpcClient grpcClient;

    //This is for getting the already booked seat for the specific show id
    public List<String> getBookedSeats(Long showId) {
        NewBookingRequest request = NewBookingRequest.newBuilder()
                .setShowId(showId)
                .build();

        NewBookingResponse response = grpcClient.getBookedSeats(request);
        return response.getSeatNumbersList();
    }

    public Boolean checkSeatAvailability(AvailabilityRequestDTO availabilityRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((User) authentication.getPrincipal()).getEmail();
        Optional<com.example.backend.model.User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            Integer userId = userOptional.get().getId();
            SelectedBookingRequest request = SelectedBookingRequest.newBuilder()
                    .setShowId(availabilityRequestDTO.getShowID())
                    .addAllSeatNumbers(availabilityRequestDTO.getSelectedSeats())
                    .setCustomerId(userId)
                    .build();
            SelectedBookingResponse response = grpcClient.checkSeatAvailability(request);
            return "true".equals(response.getIsBookingCreated());
        } else {
            return false;
        }
    }

    public boolean reservationConfirm(ReservationRequestDTO reservationRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = ((User) authentication.getPrincipal()).getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            Integer userId = userOptional.get().getId();
            confirmationBookingRequest request = confirmationBookingRequest.newBuilder()
                    .setIsBookingConfirmed(true)
                    .setShowId(reservationRequestDTO.getShowId())
                    .addAllSeatNumbers(reservationRequestDTO.getSelectedSeats())
                    .setCustomerId(userId)
                    .build();

            confirmationBookingResponse response = grpcClient.proceedConfirmation(request);

            //booking success send a mail for user.
            if (response.getIsBookingConfirmedByCinema()) {
                SelectedPaymentRequest emailRequest = SelectedPaymentRequest.newBuilder()
                        .setShowId(reservationRequestDTO.getShowId())
                        .setCustomerId(String.valueOf(userId))
                        .setIsPaymentSuccess(true)
                        .setEmail(email)
                        .build();
                grpcClient.emailConfirmation(emailRequest);


                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
