import React, { useState, useEffect } from "react";
import classes from "./Hashtags.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Hashtags = ({ hashtags }) =>
{
  const [ tweets, setTweets ] = useState([]);

  useEffect(() =>
  {
    async function fetchTweets ()
    {
      const response = await axios.get('http://localhost:3001/tweets/');
      setTweets(response.data);
    }

    fetchTweets();
  }, []);

  const getHashtags = (text) =>
  {
    const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    const hashtags = [];
    let match;
    while ((match = regex.exec(text)))
    {
      hashtags.push(match[ 1 ]);
    }
    return hashtags;
  }

  const hashtagList = tweets.reduce((hashtags, tweet) =>
  {
    const matches = getHashtags(tweet.content);
    if (matches)
    {
      matches.forEach((match) =>
      {
        const tag = match.substring(1, 11);
        if (!hashtags.includes(tag))
        {
          hashtags.push(tag);
        }
      });
    }
    return hashtags;
  }, []);
  return (
    <div className={classes.hashtags}>
      <div className="hashtag-list">
        <h3>Trending Hashtags</h3>
        <ul>
          {hashtagList.slice(0, 10).map((hashtag, index) => (
            <li key={index}>
              <Link to={`/hashtags/${ hashtag }`}>#{hashtag}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hashtags;

