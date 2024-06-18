import React, { useContext, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import { Card, Button, Checkbox } from 'antd';
import { checkSeatAvailability } from '../services/BookingService';
import '../styles/Booking/BookingData.css';
import { useNavigate } from "react-router-dom";

const BookingDetails = () => {
    const { bookingInfo } = useContext(BookingContext);
    console.log(bookingInfo);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleProceed = async () => {
        const availabilityRequest = {
            showID: bookingInfo.showID,
            selectedSeats: bookingInfo.selectedSeats

        };
        const isAvailable = await checkSeatAvailability(availabilityRequest);
        if (isAvailable) {
            navigate('/payment');
        } else {
            alert('Some of the selected seats are no longer available. Please select different seats.');
            navigate(`/seatmap/${bookingInfo.cinemaID}/${bookingInfo.movieName}/${bookingInfo.showTime}`);
        }
    };

    return (
        <div className="booking-details-container">
            <div className="disclaimer">
                <Card title="Disclaimer">
                    <ol>
                        <li>Tickets once booked cannot be exchanged or refunded.</li>
                        <li>No refund on a purchased ticket is possible, even in case of any rescheduling.</li>
                        <li>Ticket purchased is valid only for the particular show & cannot be exchanged or used for other shows/cities.</li>
                        <li>We recommend that you arrive at least 30 minutes prior at the venue to pick up your physical tickets.</li>
                        <li>The event is subject to government permissions. In case the permissions are not granted and event is canceled, a refund shall be issued to all patrons.</li>
                        <li>Unlawful resale (or attempted unlawful resale) of a ticket would lead to seizure or cancellation of that ticket without refund or other compensation & deemed action will be taken against such parties.</li>
                        <li>Each ticket admits one person only.</li>
                        <li>Internet handling fee per ticket may be levied.</li>
                        <li>Organizers reserve the right to perform security checks on invitees/members of the audience at the entry point for security reasons.</li>
                        <li>Persons under the influence of alcohol or any substances will not be allowed inside the venue, any kind of disrespect or harm to Actors & crew will not be tolerated.</li>
                        <li>Organizers or any of its agents, officers, employees shall not be responsible for any injury, damage, theft, losses or cost suffered at or as a result of the event or any part of it.</li>
                    </ol>
                </Card>
            </div>

            <div className="booking-summary">
                <Card title="Booking Summary">
                    <div className="booking-summary-content">
                        <p><strong>Movie Name:</strong> {bookingInfo.movieName}</p>
                        <p><strong>Cinema Hall Name:</strong> {bookingInfo.cinemaUserName}</p>
                        <p><strong>Date:</strong> {bookingInfo.showDate}</p>
                        <p><strong>Show Time:</strong> {bookingInfo.showTime}</p>
                        <p><strong>Selected Seats:</strong> {bookingInfo.selectedSeats.join(', ')}</p>
                        {/*<p><strong>Selected Seats:</strong> {bookingInfo.selectedSeats.map(seat => seat.number).join(', ')}</p>*/}
                        {/*<p><strong>Ticket Price:</strong> {bookingInfo.ticketPrice}</p>*/}
                        <p><strong>Total Amount:</strong> {bookingInfo.ticketPrice}
                        </p>
                    </div>
                    <Checkbox onChange={handleCheckboxChange} className="booking-checkbox">
                        I have verified the cinema name, show date and time before proceeding to payment. Once booked cinema does not allow us to Refund/Modify the booking.
                    </Checkbox>
                    <Button type="primary" disabled={!isChecked} className="proceed-button" onClick={handleProceed}>
                        Proceed to Payment
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default BookingDetails;
