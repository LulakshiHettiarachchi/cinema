import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Menu } from 'antd';
import { useAuth } from '../context/AuthContext';
import UserIcon from './UserIcon';
import Search from "antd/es/input/Search";
import '../styles/Navbar.css';

const Navbar = ({ onSearch }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleSearch = (value) => {
        onSearch(value);
    };

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
                    /* google font import */
                `}
            </style>

            <Menu mode="horizontal" className="navbar-menu">
                <div className="navbar-logo">
                   <Link to="/" className="navbar-link"> MyShow.lk</Link>
                </div>
                {location.pathname === '/' && (
                    <div className="navbar-search">
                        <Search
                            placeholder="Search Movie"
                            style={{ width: '75%' }}
                            onSearch={handleSearch}
                        />
                    </div>
                )}
                <Menu.Item key="home" className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </Menu.Item>
                {user ? (
                    <Menu.SubMenu key="user" title={<UserIcon user={user} />} className="navbar-item">
                        <Menu.Item key="profile">
                            <Link className="profile-link" to="user/profile">My Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="logout" onClick={logout}>
                            Logout
                        </Menu.Item>
                    </Menu.SubMenu>
                ) : (
                    <>
                        <Menu.Item key="login" className="navbar-item">
                            <Link to="/login" className="navbar-link">Login</Link>
                        </Menu.Item>
                        <Menu.Item key="signup" className="navbar-item">
                            <Link to="/signup" className="navbar-link">Sign Up</Link>
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </>
    );
};

export default Navbar;
