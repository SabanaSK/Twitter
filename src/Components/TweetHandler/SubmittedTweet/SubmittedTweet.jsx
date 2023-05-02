import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default function SubmittedTweet(props) {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwt_decode(token);
                const userId = decoded.id;
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

    return (
        <div>
            <strong>{currentUser.username} ({currentUser.nickname}):</strong> {props.tweet}
        </div>
    );
}
