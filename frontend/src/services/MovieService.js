
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}movies/all`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; // Propagate the error to the caller
    }
};



export  const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}movies/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getShowTimesByMovieId = async (movieId, showDate) => {
    try {
        const response = await axios.get(`${API_URL}shows/movie/${movieId}/date/${showDate}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching show times:', error);
        return [];
    }
};