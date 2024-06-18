import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import * as userService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (tokenObject) => {
        if (!tokenObject || typeof tokenObject.token !== 'string') {
            console.error('Invalid token specified');
            return;
        }

        const token = tokenObject.token;
        localStorage.setItem('token', token);

        try {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };


    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Time in seconds

                // Check if the token is expired
                if (decodedUser.exp < currentTime) {
                    console.error('Token has expired');
                    logout();
                } else {
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error('Invalid token on mount:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
