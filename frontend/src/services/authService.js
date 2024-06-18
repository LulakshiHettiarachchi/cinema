import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`,{
            username,
            email,
            password,
        });


        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed');
    }
};


export const verifyEmail = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/auth/verify_email`, { token },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.msg || 'Verification failed');
    }
};

export const resendVerificationEmail = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/auth/resend_verification`, { token });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const data = response.data;
        if (!data.token) {
            console.log(data.token);
            throw new Error(data.msg);
        }
        return data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.msg);
        } else {
            throw new Error('Login failed - Invalid user credentials');
        }
    }
};


export const sendPasswordResetEmail = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot`,{
            email
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'User not found');
    }
};
export const resetPassword = async (token,newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset`,{
            token,
            newPassword
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed');
    }
};





