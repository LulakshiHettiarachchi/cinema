import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Alert, Spin } from 'antd';
import { verifyEmail, resendVerificationEmail } from '../services/authService';

const EmailVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            setToken(token);
            verifyEmail(token)
                .then(response => {
                    setMessage(response.msg);
                    setStatus('success');
                })
                .catch(error => {
                    const errorMsg = error.message || error;
                    if (errorMsg.includes('expired')) {
                        setStatus('expired');
                        setMessage('Verification link expired. Please resend the verification email.');
                    } else {
                        setStatus('error');
                        setMessage(errorMsg);
                    }
                });
        } else {
            setStatus('error');
            setMessage('Invalid verification link');
        }
    }, [location]);

    const handleResendVerification = () => {
        resendVerificationEmail(token)
            .then(response => {
                setMessage(response.msg);
                setStatus('resend');
            })
            .catch(error => {
                setMessage(error.message || error);
                setStatus('error');
            });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 500 }}>
                {status === 'loading' && <Spin size="large" />}
                {status !== 'loading' && (
                    <>
                        <Alert message={message} type={status === 'success' ? 'success' : 'error'} showIcon />
                        {status === 'success' && (
                            <Button  className="common-btn" type="primary" onClick={() => navigate('/login')} style={{ marginTop: 20 }}>
                                Go to Login
                            </Button>
                        )}
                        {status === 'expired' && (
                            <Button className="common-btn" type="primary" onClick={handleResendVerification} style={{ marginTop: 20 }}>
                                Resend Verification Email
                            </Button>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
};

export default EmailVerification;
