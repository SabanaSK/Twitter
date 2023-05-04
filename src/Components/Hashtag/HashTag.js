import React from "react";

import classes from "./Hashtags.module.css";
import { Link } from 'react-router-dom'; //new addition
import { useState, useEffect } from 'react';

const Hashtags = ({ hashtags }) =>
{
  const [ tweets, setTweets ] = useState([]);//new addition

  useEffect(() =>
  {
    async function fetchTweets ()
    {
      const response = await fetch('/api/tweets');
      const data = await response.json();
      setTweets(data);
    }

    fetchTweets();
  }, []);

  const hashtagList = tweets.reduce((hashtags, tweet) =>
  {
    const regex = /#[\w]+/g;
    const matches = tweet.content.match(regex);
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
      {hashtagList.map((hashtag, index) =>
      {
        if (index < 10)
        { // limit to 10 hashtags
          const tag = hashtag.split(" ")[ 0 ]; // get the hashtag word
          return (
            <div className="hashtag-list">
              <h3>Trending Hashtags</h3>
              <ul>
                {hashtagList.map((tag) => (
                  <li key={tag}>
                    <Link to={`/hashtag/${ tag }`}>#{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        } else
        {
          return null; // skip hashtags after the 10th
        }
      })}
    </div>
  );
};

export default Hashtags;

