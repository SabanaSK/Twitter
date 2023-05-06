import React from 'react';
import jwt_decode from 'jwt-decode';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import SearchForFriends from '../Home/searchForUser';
import OtherUserProfilePage from './OtherUserProfile';
import '../Home/Home.css';
import { Link } from 'react-router-dom';

const OtherUserProfileLayout = () => {
  const jwt = localStorage.getItem("token");
  const loggedUserId = jwt ? jwt_decode(jwt).userId : null;
  return (
    <div className="home">
      <div className="home-left-section">
        <div className="nav-menu">
          <h3>Twitter</h3>
          <nav>
            <ul>
              <li>
                <Link className='nav-menu-link' to="/home">Home</Link>
              </li>
              <li>
                <Link className='nav-menu-link' to={`/users/profile/${loggedUserId}`}>Profile</Link>
              </li>
            </ul>
            <ProfileMenu loggedUserId={loggedUserId} />
          </nav>
        </div>
      </div>
      <div className="home-main-section">
        <OtherUserProfilePage />
      </div>
      <div className="home-right-section">
        <SearchForFriends />
        <TrendingHashtags />
      </div>
    </div>
  );
};

export default OtherUserProfileLayout;
