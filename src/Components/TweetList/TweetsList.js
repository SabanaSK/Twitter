import React from 'react';
import './TweetsList.css';
import PostTweet from '../PostTweet/PostTweet';

const TweetsList = () => {
  return (
    <div className="tweets-list">
      <PostTweet />
    </div>
  );
};

export default TweetsList;
