
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

//This is for get in the seat map relevent to that cinema hall
export const getSeatMapByShowId = async (showId) => {
    try {
        const response = await axios.get(`${API_URL}shows/view_seats/${showId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching seat map:', error);
        return [];
    }
};


//This is for get the booked seat when load the seat map.still user is not logged.no need to pass the user id.
export const getBookedSeats = async (showId) => {
    const response = await axios.get(`${API_URL}shows/get_booked_seats/${showId}`);
    return response.data;
};


//When seat selection done.After click on proceed button it  should ask to login.Now it has authorization header.
//When user click on the payment button then again it should check the availability.
//it should return is this seats are still available for this user id .

export  const checkSeatAvailability = async (availabilityRequest) => {
    try {
        console.log(availabilityRequest)
        const response = await axios.post(`${API_URL}auth/check_availability`, availabilityRequest,{
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error checking seat availability', error);
        return false;
    }
};


//This is for get the reservation success message after do the payment and all.
export const bookSeats = async (reservationRequest) => {
    const response = await axios.post(`${API_URL}auth/reservation_confirm_payment`, reservationRequest,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

