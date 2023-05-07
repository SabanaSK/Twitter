import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import TweetsList from '../TweetList/TweetsList';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import './Home.css';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';
import SearchForFriends from './searchForUser';
import Hashtags from '../Hashtag/HashTag';

const Home = () => {
  return (
    <div className="home">
      <div className="home-left-section">
        <NavMenu />
      </div>
      <div className="home-main-section">
        <Routes>
          <Route path="/" element={<TweetsList />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
      <div className="home-right-section">
        <SearchForFriends />
        <Hashtags />
        <TrendingHashtags />
      </div>
    </div>
  );
};

export default Home;