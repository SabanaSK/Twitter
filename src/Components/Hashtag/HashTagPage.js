import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavMenu from '../NavMenu/NavMenu';
// import TweetsList from '../TweetList/TweetsList';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import Hashtag from '../Hashtag/HashTag';
import { Link, Route, Routes } from 'react-router-dom';
// import SearchForFriends from '../searchForUser';
import Profile from '../Profile/Profile';

export default function HashTagPage ()
{
  const { hashtag } = useParams();
  const [ tweets, setTweets ] = useState([]);

  useEffect(() =>
  {
    axios.get(`/hashtags/${ hashtag }`)
      .then((response) =>
      {
        setTweets(response.data);
      })
      .catch((error) =>
      {
        console.error(error);
      });
  }, [ hashtag ]);

  return (
    <div className='home'>
      <div className="home-left-section">
        <NavMenu />
      </div>
      <div className="home-main-section">
        <h3># Tweets Page</h3>
        <Routes>
          {/* <Route path="/" element={<TweetsList />} /> */}
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>

        <h1>#{hashtag}</h1>
        {tweets.filter(tweet => tweet.text.includes(`#${ hashtag }`)).map((tweet) => (
          <div key={tweet._id}>
            <h2>{tweet.username}</h2>
            <h3>@{tweet.nickname}</h3>
            <p>{tweet.createdAt}</p>
            <p>{tweet.text}</p>
            <Link to={`/profile/${ tweet.user }`}>View Profile</Link>
          </div>
        ))}
      </div>
      <div className="home-right-section">
        {/* <SearchForFriends /> */}
        <Hashtag />
        <TrendingHashtags />
      </div>
    </div>
  );
}
