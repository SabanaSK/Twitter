import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './GetTweets.css';

export default function GetTweets ()
{
    const [ tweets, setTweets ] = useState([]);

    useEffect(() =>
    {
        const fetchTweets = async () =>
        {
            try
            {
                const response = await axios.get('http://localhost:3001/tweets/');
                setTweets(response.data);
            } catch (error)
            {
                console.error('Error:', error);
            }
        };
        fetchTweets();
    }, []);
    return (
        <div>
            <ul>
                {tweets.map((tweet, index) => (
                    <li key={index} className="get-tweet">
                        <strong> {tweet.username} {tweet.nickname} </strong>
                        {tweet.text.split(' ').map((word, index) => (
                            word.startsWith('#') ?
                                <a href={`/hashtags/${ word.slice(1) }`} key={index}>{word} </a> : word + ' '
                        ))}
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}
