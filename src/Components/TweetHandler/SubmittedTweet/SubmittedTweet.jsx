import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './SubmittedTweet.css';

export default function SubmittedTweet(props) {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                const userId = decoded.userId;
                console.log('userId:', userId);
                console.log('decoded:', decoded);
                console.log('currentUser:', currentUser);
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
            <strong>{currentUser.username} {currentUser.nickname}</strong> {props.tweet}
        </div>
    ) : null;
}
