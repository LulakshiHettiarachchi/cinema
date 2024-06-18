import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import '../styles/ResetPasswordForm.css'; // Import the CSS file for styling

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');

    const onFinish = async (values) => {
        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await resetPassword(token, values.password);
            setSuccess('Your password has been reset successfully.');
            setError(null);
            navigate('/login'); // Redirect to login page after success
        } catch (error) {
            console.error('Failed to reset password:', error.message);
            setError('Failed to reset password. Please try again.');
            setSuccess(null);
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
        <div className="reset-password-form-container">
            <Card className="reset-password-card">
                <div className="reset-password-header">
                    <div className="reset-password-title">Reset Password</div>
                </div>
                {error && <Alert message={error} type="error" showIcon className="reset-password-alert" />}
                {success && <Alert message={success} type="success" showIcon className="reset-password-alert" />}
                <Form name="reset-password" onFinish={onFinish}>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, validator: passwordValidator }]}
                        hasFeedback
                    >
                        <Input.Password placeholder="New Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords do not match!');
                                },
                            }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                    <Form.Item>
                        <div className="reset-password-button-container">
                            <Button type="primary" htmlType="submit" className="reset-password-button">
                                Reset Password
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ResetPasswordForm;
