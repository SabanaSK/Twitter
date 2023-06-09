import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './SubmittedTweet.css';
import { Link } from 'react-router-dom';

export default function SubmittedTweet(props) {
    const [currentUser, setCurrentUser] = useState({});



    useEffect(() => {
        const fetchCurrentUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                const userId = decoded.userId;
                try {
                    const response = await axios.get(`http://localhost:3001/users/${userId}`);
                    setCurrentUser(response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchCurrentUser();
    }, []);


    return props.show ? (
        <div className="submitted-tweet">
            <strong>
                <Link to={`profile/${currentUser._id}`}>
                    {currentUser.username} {currentUser.nickname}
                </Link>
            </strong>
            {props.tweet.split(' ').map((word, index) => (
                word.startsWith('#') ?
                    <a href={`/hashtags/${word.slice(1)}`} key={index}>{word} </a> : word + ' '
            ))}

        </div>
    ) : null;
}


