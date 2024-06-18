//
// import React, { useState } from 'react';
// import { Form, Input, Button, Card, Alert } from 'antd';
// import { registerUser } from '../services/authService';
// import { useNavigate } from 'react-router-dom';
//
// const SignupForm = () => {
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMessage] = useState(null);
//
//     const onFinish = async (values) => {
//         try {
//             const userData = await registerUser(values.username, values.email, values.password);
//             if (userData.token) {
//                 console.log('Signup successful:', userData);
//                 navigate('/login');
//             } else {
//                 setErrorMessage(userData.msg);
//             }
//         } catch (error) {
//             console.error('Signup failed:', error.message);
//             setErrorMessage('An error occurred during signup. Please try again.');
//         }
//     };
//
//     const passwordValidator = (rule, value) => {
//         if (!value) {
//             return Promise.reject('Please input your password!');
//         }
//         if (value.length < 8) {
//             return Promise.reject('Password must be at least 8 characters long!');
//         }
//         if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
//             return Promise.reject('Password must contain at least one letter and one number!');
//         }
//         return Promise.resolve();
//     };
//
//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//             <Card style={{width: 500, borderColor: 'purple'}}>
//                 <div style={{marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column'}}>
//                     <div>
//                         <img src='/assets/cinema_signup.png' alt="Signup"
//                              style={{width: 150, height: 150, borderRadius: '50%'}}/>
//                     </div>
//                     <div style={{
//                         marginTop: 10,
//                         color: '#53a3a4',
//                         fontWeight: 'bold',
//                         fontSize: '40px',
//                         lineHeight: '1.2'
//                     }}>Sign Up</div>
//                 </div>
//                 <Form name="signup" onFinish={onFinish}>
//                     {errorMessage && (
//                         <Form.Item>
//                             <Alert message={errorMessage} type="error" showIcon/>
//                         </Form.Item>
//                     )}
//                     <Form.Item name="username" rules={[{required: true, message: 'Please input your username!'}]}>
//                         <Input placeholder="Username"/>
//                     </Form.Item>
//                     <Form.Item name="email" rules={[{required: true, message: 'Please input your email!'}, {
//                         type: 'email',
//                         message: 'The input is not valid E-mail!'
//                     }]}>
//                         <Input placeholder="Email"/>
//                     </Form.Item>
//                     <Form.Item
//                         name="password"
//                         rules={[{validator: passwordValidator}]}
//                     >
//                         <Input.Password placeholder="Password"/>
//                     </Form.Item>
//                     <Form.Item style={{textAlign: 'left'}}>
//                         <div style={{display: 'flex', justifyContent: 'center'}}>
//                             <Button type="primary" htmlType="submit"
//                                     style={{backgroundColor: '#53a3a4', borderColor: '#53a3a4'}}>
//                                 Sign Up
//                             </Button>
//                         </div>
//                     </Form.Item>
//                 </Form>
//             </Card>
//         </div>
//     );
// };
//
// export default SignupForm;
import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert } from 'antd';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Add state for success message

    const onFinish = async (values) => {
        try {
            const userData = await registerUser(values.username, values.email, values.password);
            if (userData.token) {
                console.log('Signup successful:', userData);
                setSuccessMessage('Signup successful! Please check your email to verify your account.'); // Set success message
                // navigate('/login'); // Do not navigate to login
            } else {
                setErrorMessage(userData.msg);
            }
        } catch (error) {
            console.error('Signup failed:', error.message);
            setErrorMessage('An error occurred during signup. Please try again.');
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 500, borderColor: 'purple' }}>
                {successMessage ? ( // Conditionally render success message
                    <div style={{ textAlign: 'center' }}>
                        <Alert message={successMessage} type="success" showIcon />
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <div>
                                <img src='/assets/cinema_signup.png' alt="Signup" style={{ width: 150, height: 150, borderRadius: '50%' }} />
                            </div>
                            <div style={{ marginTop: 10, color: '#53a3a4', fontWeight: 'bold', fontSize: '40px', lineHeight: '1.2' }}>Sign Up</div>
                        </div>
                        <Form name="signup" onFinish={onFinish}>
                            {errorMessage && (
                                <Form.Item>
                                    <Alert message={errorMessage} type="error" showIcon />
                                </Form.Item>
                            )}
                            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input placeholder="Username" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}>
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item name="password" rules={[{ validator: passwordValidator }]}>
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'left' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#53a3a4', borderColor: '#53a3a4' }}>
                                        Sign Up
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Card>
        </div>
    );
};

export default SignupForm;
