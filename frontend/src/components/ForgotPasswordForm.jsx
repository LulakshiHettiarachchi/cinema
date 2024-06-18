import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import { sendPasswordResetEmail } from '../services/authService'; // Assume you have this service function
import '../styles/ForgotPasswordForm.css'; // Import the CSS file for styling

const ForgotPasswordForm = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onFinish = async (values) => {
        try {
            await sendPasswordResetEmail(values.email);
            setSuccess('A password reset link has been sent to your email. Please check your inbox.');
            setError(null);
        } catch (error) {
            console.error('Failed to send password reset email:', error.message);
            setError(error.message);
            setSuccess(null);
        }
    };

    return (
        <div className="forgot-password-form-container" >
            <Card className="forgot-password-card">
                <div className="forgot-password-header">
                    <div className="forgot-password-title">Forgot Password</div>
                </div>
                {error && <Alert message={error} type="error" showIcon className="forgot-password-alert" />}
                {success && <Alert message={success} type="success" showIcon className="forgot-password-alert" />}
                <Form name="forgot-password" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item>
                        <div className="forgot-password-button-container">
                            <Button type="primary" htmlType="submit" className="forgot-password-button">
                                Send Reset Link
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ForgotPasswordForm;
