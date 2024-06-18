
import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const redirectTo = queryParams.get('redirectTo') || '/';
    const selectedSeats = queryParams.get('selectedSeats') || '';

    return (
        <div className="p-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: `url('/assets/background.jpg')`, backgroundSize: 'cover' }}>
            <LoginForm redirectTo={redirectTo} selectedSeats={selectedSeats} />
        </div>
    );
};

export default Login;
