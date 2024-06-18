import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getSeatMapByShowId, getBookedSeats } from '../services/BookingService';
import { BookingContext } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Booking/SeatMap.css';
import { Button } from 'antd';
import queryString from 'query-string';

const SeatMap = () => {
    const { id, name, time } = useParams();
    const { bookingInfo, setBookingInfo } = useContext(BookingContext);
    // console.log(bookingInfo.showID);
    const { user } = useAuth();
    const [seatMap, setSeatMap] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const seatMapData = await getSeatMapByShowId(parseInt(bookingInfo.showID));
            setSeatMap(seatMapData);

            const bookedSeatsData = await getBookedSeats(parseInt(bookingInfo.showID));
            setBookedSeats(bookedSeatsData);
        };
        fetchData();
    }, [bookingInfo.showID]);

    useEffect(() => {
        const params = queryString.parse(location.search);
        if (params.selectedSeats) {
            setSelectedSeats(params.selectedSeats.split(','));
        }
    }, [location.search]);

    const handleSeatClick = (seat) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat.number)) {
                return prevSelectedSeats.filter((s) => s !== seat.number);
            } else {
                return [...prevSelectedSeats, seat.number];
            }
        });
    };

    const getSeatClass = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            return 'seat selected';
        } else if (bookedSeats.includes(seatNumber)) {
            return 'seat booked';
        } else {
            return 'seat';
        }
    };

    const handleProceed = async () => {
        if (!user) {
            navigate(`/login?redirectTo=/seatmap/${id}/${name}/${time}&selectedSeats=${selectedSeats.join(',')}`);
            return;
        }

        const totalTicketPrice = selectedSeats.length * bookingInfo.ticketPrice;
        setBookingInfo((prev) => ({
            ...prev,
            selectedSeats,
            ticketPrice: totalTicketPrice,
        }));

        navigate('/booking-data');
    };

    const renderSection = (section, startColumn) => {
        const rows = [];
        const { numRows, columns, startRowNumber, endRowNumber } = section;

        const startRowCharCode = startRowNumber.charCodeAt(0);
        const endRowCharCode = endRowNumber.charCodeAt(0);

        for (let i = startRowCharCode; i <= endRowCharCode; i++) {
            const row = String.fromCharCode(i);
            rows.push(
                <div key={row} className="seatmap-row">
                    {[...Array(columns)].map((_, columnIndex) => {
                        const seatNumber = `${row}${startColumn + columnIndex}`;
                        const seat = {
                            number: seatNumber,
                            booked: bookedSeats.includes(seatNumber),
                            price: bookingInfo.ticketPrice,
                        };
                        return (
                            <div
                                key={seatNumber}
                                className={getSeatClass(seatNumber)}
                                onClick={() => !seat.booked && handleSeatClick(seat)}
                            >
                                {seat.number}
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div key={section.sectionId} className="section">
                <div className="seatmap">
                    {rows}
                </div>
            </div>
        );
    };

    return (
        <div className="seatmap-container">
            <div className="top-bar">
                <h1 className="movie-title">{name}</h1>
                <h2 className="movie-time">{time}</h2>
                <Button type="primary" className="common-btn" onClick={handleProceed} disabled={selectedSeats.length === 0}>
                    Proceed
                </Button>
            </div>

            <div className="seat-map-section">
                <p className="screen-text">Screen is here</p>
                <div className="sections-row">
                    {seatMap.reduce((acc, section) => {
                        const startColumn = acc.nextStartColumn;
                        acc.sections.push(renderSection(section, startColumn));
                        acc.nextStartColumn += section.columns;
                        return acc;
                    }, { sections: [], nextStartColumn: 1 }).sections}
                </div>

                <div className="seatmap-info">
                    <p>Selected Seats: {selectedSeats.join(', ')}</p>
                    <p>Total Price: Rs. {selectedSeats.length * bookingInfo.ticketPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default SeatMap;
