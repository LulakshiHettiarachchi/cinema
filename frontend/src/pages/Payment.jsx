import React, { useContext, useState } from 'react';
import { Card, Input, Button, message, Spin } from 'antd';
import '../styles/Booking/Payment.css'; // Ensure this file exists and is correctly referenced
import { bookSeats } from "../services/BookingService";
import { BookingContext } from "../context/BookingContext";
import TicketPrint from "../components/Movie/Ticket";

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const { bookingInfo } = useContext(BookingContext);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        // Basic validations
        const cvvRegex = /^\d{3}$/;
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

        if (!cvvRegex.test(cvv)) {
            message.error('Invalid CVV. Please enter a 3-digit CVV.');
            return;
        }

        if (!expiryDateRegex.test(expiryDate)) {
            message.error('Invalid expiry date. Please use MM/YY format.');
            return;
        }

        setIsPaymentSubmitted(true);

        const reservationRequest = {
            showId: bookingInfo.showID,
            selectedSeats: bookingInfo.selectedSeats,
        };

        try {
            const bookingResponse = await bookSeats(reservationRequest);

            if (bookingResponse) {
                setTimeout(() => {
                    message.success('Payment successful! Enjoy your movie!');
                    setIsPaymentSuccessful(true);
                }, 2000); // Simulate some delay for the payment process
            } else {
                message.error('Sorry, booking not successful.');
                setIsPaymentSubmitted(false);
            }
        } catch (error) {
            message.error('An error occurred during the booking process.');
            console.error('Booking error:', error);
            setIsPaymentSubmitted(false);
        }
    };

    return (
        <div className="payment-container">
            <Card title="Payment">
                {isPaymentSubmitted && !isPaymentSuccessful ? (
                    <div className="loading-container">
                        <Spin tip="Processing payment..." size="large"/>
                    </div>
                ) : (
                    <div className="payment-form">
                        {!isPaymentSuccessful ? (
                            <>
                                <p>Tickets will be sent to your logged email</p>
                                <h3>Enter Payment Details</h3>
                                <form onSubmit={handlePaymentSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <Input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            placeholder="Enter card number"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expiryDate">Expiry Date</label>
                                        <Input
                                            type="text"
                                            id="expiryDate"
                                            name="expiryDate"
                                            placeholder="MM/YY"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cvv">CVV</label>
                                        <Input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            placeholder="Enter CVV"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button className="common-btn" type="primary" htmlType="submit">
                                        Submit Payment
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <TicketPrint ticketDetails={bookingInfo} />
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Payment;
