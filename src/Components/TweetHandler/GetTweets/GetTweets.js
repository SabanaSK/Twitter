import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './GetTweets.css';

export default function GetTweets() {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await axios.get('http://localhost:3001/tweets/');
                setTweets(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTweets();
    }, []);

    return (
        <div>
            <h1>Tweets</h1>
            <ul>
                {tweets.map((tweet, index) => (
                    <li key={index}>
                        <strong>{tweet.username} ({tweet.nickname}):</strong> {tweet.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}
