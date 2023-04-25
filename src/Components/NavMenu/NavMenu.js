import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';

const NavMenu = () => {
    return (
        <div className="nav-menu">
            <h3>Twitter</h3>
            <nav>
                <ul>
                    <li>
                        <Link className='nav-menu-link' to="/">Home</Link>
                    </li>
                    <li>
                        <Link className='nav-menu-link' to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link className='nav-menu-link' to="/settings">Settings</Link>
                    </li>
                </ul>
                <ProfileMenu />
            </nav>
        </div>
    );
};

export default NavMenu;
