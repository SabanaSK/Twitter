import React, { useState } from 'react';
import './TweetsList.css';
import PostTweet from '../TweetHandler/PostTweet/PostTweet';
import GetTweets from "../TweetHandler/GetTweets/GetTweets";
import SubmittedTweet from "../TweetHandler/SubmittedTweet/SubmittedTweet";

const TweetsList = () => {
    const [submittedTweet, setSubmittedTweet] = useState('');

    const handleSubmittedTweetChange = (tweet) => {
        setSubmittedTweet(tweet);
    }

    return (
        <div className="tweets-list">
            <PostTweet onSubmittedTweetChange={handleSubmittedTweetChange} />
            <SubmittedTweet tweet={submittedTweet} />
            <GetTweets />
        </div>
    );
};

export default TweetsList;
