import React, { useEffect, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Card, Spin, Input, Button, Tooltip, message } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import 'react-phone-input-2/lib/style.css';
import '../styles/UserProfileCard.css';
import { getUserProfile, updateUserProfile } from "../services/UserProfileService";
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useAuth } from "../context/AuthContext";
const UserProfileCard =()=>{
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const [error, setError] = useState(null);
    const phoneUtil = PhoneNumberUtil.getInstance();

    const isPhoneValid = (phoneNumber) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phoneNumber));
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        const fetchData=async ()=>{
            try{
                const data = await getUserProfile();
                setUserData(data);
                setUsername(data.username);
                if(phoneNumber){setPhoneNumber(data.phoneNumber)}else {setPhoneNumber("null")}
                setEmail(data.email);
                setLoading(false);
            }
            catch (error){
                console.log(error)
                setError('Error loading user data');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        if (!isPhoneValid(phoneNumber)) {
            message.error('Please enter a valid phone number');
            return;
        }
        if (!username) {
            message.error('Username is required');
            return;
        }

        try {
            const updatedData = { username, phoneNumber };
            await updateUserProfile(updatedData);
            setUserData({ ...userData, username, phoneNumber });
            setIsEditing(false);
            message.success('Changes saved successfully');
        } catch (error) {
            setError('Error updating user data.');
        }
    };

    if (loading) {
        return <Spin />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-container">
            <Card
                title={isEditing ? <Input  value={username} onChange={e => setUsername(e.target.value)} required /> : userData.username}
                extra={
                    isEditing ? (
                        <div className="save-cancel-btn">
                            <Button type="primary" className="save-cancle-btn" icon={<SaveOutlined />} onClick={handleSave} />
                            <Button type="danger" className="save-cancle-btn" icon={<CloseOutlined />} onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }} />
                        </div>
                    ) : (
                        <EditOutlined className="icon" onClick={() => setIsEditing(true)} />
                    )
                }
                className="profile-card"
                bodyStyle={{ padding: '20px' }}
            >
                <p className="email">
                    <Tooltip title="You cannot change the email">
                        <MailOutlined className="icon" /> {userData.email}
                    </Tooltip>
                </p>
                <p className="phone">
                    <PhoneOutlined className="icon" />
                    {isEditing ? (
                        <PhoneInput
                            country="lk"
                            defaultCountry="lk"
                            value={userData.phoneNumber?userData.phoneNumber:"+94"}
                            onChange={phone => setPhoneNumber(phone)}
                            inputStyle={{ width: '100%' }}
                            enableSearch={false}
                            disableDropdown
                        />
                    ) : (
                        userData.phoneNumber ? userData.phoneNumber : <span className="phone-not-set">Phone number not set</span>
                    )}
                </p>
            </Card>
        </div>
    );
};

export default UserProfileCard;
