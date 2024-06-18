import React, { useEffect, useState } from 'react';
import 'react-international-phone/style.css';
import { Card} from 'antd';
import 'react-phone-input-2/lib/style.css';
import '../styles/UserBookingHistory.css';

const UserBookingHistory = () => {


    return (
        <div className="profile-container">
            <Card
                title="Booking History"
                className="profile-card"
                bodyStyle={{ padding: '20px' }}
            >
                <p>
                    No History Available
                </p>

            </Card>

        </div>

    );
};

export default UserBookingHistory;
