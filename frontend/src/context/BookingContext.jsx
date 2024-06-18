// src/context/BookingContext.js
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingInfo, setBookingInfo] = useState({
        cinemaID:'',
        cinemaUserName: '',
        movieName: '',
        showTime: '',
        selectedSeats: [],
        ticketPrice: 0,
        showID:'',
        showDate: '',
    });

    return (
        <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
            {children}
        </BookingContext.Provider>
    );
};
