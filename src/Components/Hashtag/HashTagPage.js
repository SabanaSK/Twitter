import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavMenu from '../NavMenu/NavMenu';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import Hashtag from '../Hashtag/HashTag';
import { Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';
import { Link } from 'react-router-dom';

export default function HashTagPage() {
  const { hashtag } = useParams();
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/hashtags/${hashtag}`);
        setTweets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTweets();
  }, [hashtag]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const getUserName = (author) => {
    const user = users.find((user) => user._id === author);
    return user ? `${user.username} ${user.nickname}` : '';
  };

  return (
    <div className="home">
      <div className="home-left-section">
        <NavMenu />
      </div>
      <div className="home-main-section">
        <h3># Tweets Page</h3>
        <Routes>
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
        <h1>#{hashtag}</h1>
        {tweets
          .filter((tweet) => tweet.text.includes(`#${hashtag}`))
          .map((tweet) => (
            <div key={tweet._id}>
              <h2>  <Link to={`/users/profile/${tweet.author}`}> {getUserName(tweet.author)} </Link></h2>
              <p>{tweet.createdAt}</p>
              <p>{tweet.text.split(' ').map((word, index) => (
                word.startsWith('#') ?
                  <a href={`/hashtags/${word.slice(1)}`} key={index}>{word} </a> : word + ' '
              ))}
              </p>

            </div>
          ))}
      </div>
      <div className="home-right-section">
        <Hashtag />
        <TrendingHashtags />
      </div>
    </div>
  );
}
