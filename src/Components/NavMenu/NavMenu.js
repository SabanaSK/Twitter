import React from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import './NavMenu.css';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';

const NavMenu = () => {
    const jwt = localStorage.getItem("token");
    const loggedUserId = jwt ? jwt_decode(jwt).userId : null;

    return (

        <div className="nav-menu">
            <h3>Twitter</h3>
            <nav>
                <ul>
                    <li>
                        <Link className='nav-menu-link' to="/home">Home</Link>
                    </li>
                    {loggedUserId && (<li>
                        <Link className='nav-menu-link' to={`profile/${loggedUserId}`}>Profile</Link>
                    </li>)}
                    <li>
                        <Link className='nav-menu-link' to="/settings">Settings</Link>
                    </li>
                </ul>
                <ProfileMenu loggedUserId={loggedUserId}/>
            </nav>
        </div>
    );
};

export default NavMenu;

