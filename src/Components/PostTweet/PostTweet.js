import axios from 'axios';
import { React, useState } from 'react';
import './PostTweet.css';

export default function PostTweet() {
    const [postText, setPostText] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setPostText(text);
        setMessage(null);
        setIsButtonDisabled(text.length > 145 || text.length <= 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/tweet/', { text: postText }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPostText('');
            setMessage({ statusMessage: 'Your tweet has been posted!', type: 'success-message', });
        } catch (err) {
            setMessage({ statusMessage: 'An unexpected error ocurred', type: 'error-message' })
            console.log(err)
        }
    };


    return (
        <div className='post-tweet'>
            <form className="tweet-form" onSubmit={handleSubmit} >
                <textarea
                    placeholder="What's happening?"
                    value={postText}
                    onChange={handleInputChange}
                    className="tweet-text"
                    rows={1}
                />
                <div className="bottom-content">
                    {message && <div className={('message ' + message.type)}>{message.statusMessage}</div>}
                    <button className="post-tweet-button" type="submit" disabled={isButtonDisabled} >
                        Tweet
                    </button>
                </div>
            </form>
        </div>
    );
}
