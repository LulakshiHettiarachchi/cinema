import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const UserIcon = ({ user }) => {

    if (!user || !user.sub) {
        console.log(user.sub);

        // Render a default icon or placeholder
        return <UserOutlined style={{ fontSize: '20px', color: '#3e3e9c' }} />;
    }

    const initials = user.sub;
    return (
        <div className="user-icon">
            <span style={{ fontSize: '20px', color: '#3e3e9c' ,fontWeight:'bold'}}><UserOutlined style={{ fontSize: '20px', color: '#3e3e9c' ,fontWeight:'bold'}} /> {initials}</span>
        </div>
    );
};

export default UserIcon;
