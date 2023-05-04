import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import SearchForFriends from '../Home/searchForUser';
import OtherUserProfilePage from './OtherUserProfile';
import '../Home/Home.css';

const OtherUserProfileLayout = () => {
  return (
    <div className="home">
      <div className="home-left-section">
        <NavMenu />
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
