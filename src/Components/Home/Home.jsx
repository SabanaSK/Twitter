import React, { useState, useEffect } from 'react';
import NavMenu from '../NavMenu/NavMenu';
import TweetsList from '../TweetList/TweetsList';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import './Home.css';
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import Profile from '../Profile/Profile';

const Home = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/homeuser?count=4");
        setUsers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="home">
      <div className="home-left-section">
        <NavMenu />
      </div>
      <div className="home-main-section">
        <Routes>
          <Route path="/" element={<TweetsList />} />
          <Route path="profile/:userId" element={<Profile />} />
        </Routes>
        {/* <div>
          {users ? (
            <div>
              {users.map(user => (
                <div key={user.id}>
                  <h2>{user.username}</h2>
                  <h4>{user.nickname}</h4>
                  <p>{user.followers}</p>
                  <p>{user.city}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div> */}
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