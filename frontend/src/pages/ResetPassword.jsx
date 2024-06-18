import React from 'react';
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ForgotPassword = () => {
    return (
        <div className="p-4" style={{ background: `url('/assets/background.jpg')`, backgroundSize: 'cover' }}>

            <ResetPasswordForm/>
        </div>
    );
};

export default ForgotPassword;