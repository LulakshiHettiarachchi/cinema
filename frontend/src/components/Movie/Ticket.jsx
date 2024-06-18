import React from 'react';
import { Card, Button } from 'antd';
import { useReactToPrint } from 'react-to-print';
import '../../styles/Booking/Ticket.css';

const Ticket = React.forwardRef(({ ticketDetails }, ref) => {
    return (
        <div ref={ref} className="ticket-container">
            <Card className="ticket-card">
                <h2 className="ticket-title">{ticketDetails.movieName}</h2>
                <div className="ticket-info">
                    <p><strong>Cinema:</strong> {ticketDetails.cinemaUserName}</p>
                    <p><strong>Show Time:</strong> {ticketDetails.showDate}</p>
                    <p><strong>Show Time:</strong> {ticketDetails.showTime}</p>
                    <p><strong>Seats:</strong> {ticketDetails.selectedSeats.join(', ')}</p>
                    <p><strong>Price:</strong> Rs.{ticketDetails.ticketPrice}</p>
                </div>
            </Card>
        </div>
    );
});

const TicketPrint = ({ticketDetails }) => {
    const ticketRef = React.useRef();
    const handlePrint = useReactToPrint({
        content: () => ticketRef.current,
    });

    return (
        <div className="ticket-print-container">
            <Ticket ref={ticketRef} ticketDetails={ticketDetails} />
            <Button type="primary" className="common-btn" onClick={handlePrint}>
                Download Ticket
            </Button>
        </div>
    );
};

export default TicketPrint;
