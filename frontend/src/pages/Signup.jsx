import React from 'react';
import SignupForm from '../components/SignupForm';

const Signup = () => {
    return (
        <div className="p-4" style={{background: `url('assets/background.jpg')`, backgroundSize: 'cover'}}>

            <SignupForm />
        </div>
    );
};

export default Signup;
