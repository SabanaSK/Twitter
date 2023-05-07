import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './GetTweets.css';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function GetTweets() {
    const [tweets, setTweets] = useState([]);
    const jwt = localStorage.getItem("token");
    const loggedUserId = jwt ? jwt_decode(jwt).userId : null;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/tweets/${loggedUserId}/following`);
                setTweets(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTweets();
    }, [loggedUserId]);

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

    const getUserNameAndNickname = (author) => {
        const user = users.find((user) => user._id === author);
        return user ? `${user.username} ${user.nickname}` : '';
    };


    return (
        <div>
            <ul>
                {tweets.slice().reverse().map((tweet, index) => ( // reversed order
                    <li key={index} className="get-tweet">
                        <strong>
                            <Link to={`/users/profile/${tweet.author}`}> {getUserNameAndNickname(tweet.author)} </Link>
                        </strong>
                        {tweet.text.split(' ').map((word, index) => (
                            word.startsWith('#') ?
                                <a href={`/hashtags/${word.slice(1)}`} key={index}>{word} </a> : word + ' '
                        ))}
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}

