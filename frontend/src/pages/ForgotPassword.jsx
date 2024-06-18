import React from 'react';
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPassword = () => {
    return (
        <div className="p-4" style={{ background: `url('/assets/background.jpg')`, backgroundSize: 'cover' }}>

            <ForgotPasswordForm/>
        </div>
    );
};

export default ForgotPassword;