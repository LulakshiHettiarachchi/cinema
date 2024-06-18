package com.example.backend.grpc;
import com.server.proto.*;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class GrpcClient {

    private BookingServiceGrpc.BookingServiceBlockingStub serviceStub;

    @PostConstruct
    private void init() {
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress("10.20.11.148", 6565)
                .usePlaintext()
                .build();

        serviceStub = BookingServiceGrpc.newBlockingStub(channel);
    }

    //get booked seat when seat map load
    public NewBookingResponse getBookedSeats(NewBookingRequest newBookingRequest){
        return serviceStub.getBookedSeats(newBookingRequest);
    }

    //check availability and booking created here.if not available return false
    public SelectedBookingResponse checkSeatAvailability(SelectedBookingRequest selectedBookingRequest){

            return serviceStub.createBooking(selectedBookingRequest);}

    //after do the payement get the confirmation about the booking
    public confirmationBookingResponse proceedConfirmation(confirmationBookingRequest confirmationBookingReq){
            return serviceStub.proceedConfirmation(confirmationBookingReq);
        }


    public emailResponse emailConfirmation(SelectedPaymentRequest selectedPaymentRequest){
        return serviceStub.emailConfirmation(selectedPaymentRequest);
    }

}
