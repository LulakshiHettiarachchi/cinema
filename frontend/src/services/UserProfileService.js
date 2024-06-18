// src/services/apiService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUserProfile = async (userProfileDTO) => {
    const response = await axios.post(`${API_URL}user/profile`, userProfileDTO, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};


export const updateUserProfile = async (userProfileDTO) => {
    const response = await axios.put(`${API_URL}user/profile_update`, userProfileDTO, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

