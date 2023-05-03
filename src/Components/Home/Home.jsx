import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import TweetsList from '../TweetList/TweetsList';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import './Home.css';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';

const Home = () => {


  return (
    <div className="home">
      <div className="home-left-section">
        <NavMenu />
      </div>
      <div className="home-main-section">
        <Routes>
          <Route path="/" element={<TweetsList />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </div>
      <div className="home-right-section">
        <input
          type="text"
          className="search-box"
          placeholder="Search on Twitter"
        />
        <TrendingHashtags />
      </div>
    </div>
  );
};

export default Home;
