import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'; // Import the CSS file for styling

const LoginForm = ({ redirectTo, selectedSeats }) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        try {
            const userData = await loginUser(values.email, values.password);
            login(userData);
            navigate(`${redirectTo}?selectedSeats=${selectedSeats}`);
        } catch (error) {
            console.error('Login failed:', error.message);
            setError(error.message); // Set the error message from the backend
        }
    };

    const passwordValidator = (rule, value) => {
        if (!value) {
            return Promise.reject('Please input your password!');
        }
        if (value.length < 8) {
            return Promise.reject('Password must be at least 8 characters long!');
        }
        if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
            return Promise.reject('Password must contain at least one letter and one number!');
        }
        return Promise.resolve();
    };

    return (
        <div className="login-form-container">
            <Card className="login-card">
                <div className="login-header">
                    <img src='/assets/cinema_signup.png' alt="Signup" className="login-image"/>
                    <div className="login-title">Login</div>
                </div>
                {error && <Alert message={error} type="error" showIcon className="login-alert" />}
                <Form name="login" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        hasFeedback
                        validateStatus={error ? 'error' : ''}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, validator: passwordValidator }]}
                        hasFeedback
                        validateStatus={error ? 'error' : ''}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <div className="login-button-container">
                            <Button type="primary" htmlType="submit" className="login-button">
                                Login
                            </Button>
                        </div>
                    </Form.Item>
                    {/* Add Forgot Password link */}
                    <Form.Item>
                        <div className="forgot-password-link">
                            <Link to="/forgot">Forgot Password?</Link>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="sign-up-link">
                            <span>Don&apos;t have an account? </span>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
