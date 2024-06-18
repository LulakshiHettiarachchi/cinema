
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowTimesByMovieId } from '../services/MovieService';
import { BookingContext } from '../context/BookingContext';
import { Card, DatePicker, Modal, Button } from 'antd';
import '../styles/Movie/ShowTimes.css';
import moment from 'moment';

const ShowTimes = () => {
    const { id, name } = useParams();
    const navigate = useNavigate();
    const { setBookingInfo } = useContext(BookingContext);

    const [selectedDate, setSelectedDate] = useState(moment());
    const [showTimes, setShowTimes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedShowTime, setSelectedShowTime] = useState(null);

    useEffect(() => {
        const fetchShowTimes = async () => {
            const data = await getShowTimesByMovieId(parseInt(id), selectedDate.format('YYYY-MM-DD'));
            setShowTimes(data);
        };

        fetchShowTimes();
    }, [id, selectedDate]);

    const onDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    const handleShowTimeClick = (showTime) => {
        setSelectedShowTime(showTime);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setBookingInfo((prev) => ({
            ...prev,
            cinemaID: id,
            cinemaUserName: selectedShowTime.cinemaUserName, // Add cinema user name
            movieName: name,
            showTime: selectedShowTime.showTime,
            ticketPrice: selectedShowTime.seatPrice,
            showID: selectedShowTime.showID,
            showDate: selectedDate.format('YYYY-MM-DD'), // Add show date
        }));
        navigate(`/seatmap/${id}/${name}/${selectedShowTime.showTime}`);
    };

    const disabledDate = (current) => {
        // Disable dates before today
        return current && current < moment().startOf('day');
    };
    const groupedShows = groupShowsByCinemaUsername(showTimes);

    return (
        <div className="showtimes-container">
            <div className="showtime-title">
                <h1>{name} - Show Times</h1>
                <DatePicker
                    className="date-picker"
                    defaultValue={moment()}
                    value={selectedDate}
                    onChange={onDateChange}
                    disabledDate={disabledDate}
                />
            </div>
            {groupedShows.length ? (
                groupedShows.map((group, index) => (
                    <Card key={index} className="showtime-card">
                        <div className="showtime-info">
                            <h2>{group.cinemaUserName}</h2>
                            <div className="showtimes">
                                {group.shows.map((show, idx) => (
                                    <span
                                        key={idx}
                                        className="showtime"
                                        onClick={() => handleShowTimeClick(show)}
                                    >
                                        {show.showTime}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))
            ) : (
                <Card className="showtime-card">
                    <div className="showtime-info">
                        <h2>No showtimes available for this movie on the selected date.</h2>
                    </div>
                </Card>
            )}
            <Modal
                title="Terms and Conditions"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Okay
                    </Button>
                ]}
            >
                <p>You cannot take foods from outside.</p>
                <p>Once the ticket is booked, you cannot cancel or modify the booking.</p>
                <p>Please check the showtime and date before you make the payment.</p>
            </Modal>
        </div>
    );
};

const groupShowsByCinemaUsername = (shows) => {
    const groupedShows = [];

    shows.forEach((show) => {
        const existingGroupIndex = groupedShows.findIndex(
            (group) => group.cinemaUserName === show.cinemaUserName
        );

        if (existingGroupIndex !== -1) {
            groupedShows[existingGroupIndex].shows.push(show);
            groupedShows[existingGroupIndex].shows.sort((a, b) => a.showTime.localeCompare(b.showTime));
        } else {
            groupedShows.push({ cinemaUserName: show.cinemaUserName, shows: [show] });
        }
    });

    return groupedShows;
};

export default ShowTimes;
