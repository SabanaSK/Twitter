import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import EditProfile from './EditPage';


const Profile = () =>
{
  const { id } = useParams();
  const [ profileData, setProfileData ] = useState(null);
  const [ tweets, setTweets ] = useState([]);
  const [ showEdit, setShowEdit ] = useState(false);
  const jwt = localStorage.getItem("token");
  const loggedUserId = jwt ? jwt_decode(jwt).userId : null;

  useEffect(() =>
  {
    const fetchProfile = async () =>
    {
      try
      {
        const response = await axios.get(`http://localhost:3001/profile/${ id }`);
        setProfileData(response.data);

      } catch (error)
      {
        console.log(error);
      }
    };
    fetchProfile();
  }, [ id ]);

  useEffect(() =>
  {
    const fetchProfileTweets = async () =>
    {
      try
      {
        const response = await axios.get(`http://localhost:3001/tweets/${ id }`);
        setTweets(response.data);

      } catch (error)
      {
        console.log(error);
      }
    };
    fetchProfileTweets();
  }, [ id ]);


  if (!profileData)
  {
    return <p>Loading...</p>;
  }
  const handleEditButtonClick = () =>
  {
    setShowEdit(true);

  }

  const handleCancelClick = () =>
  {
    setShowEdit(false);
  }



  const avatarSrc =
    profileData.avatarImageUrl && profileData.avatarImageUrl !== ""
      ? profileData.avatarImageUrl
      : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";


  return (
    <div className="profile">
      <img className="profile-banner" src="https://via.placeholder.com/600x200" alt="Profile banner" />
      <div className="profile-info">
        <img className="profile-avatar" src={avatarSrc} alt="Profile avatar" />
        {id === loggedUserId ? (
          <button onClick={handleEditButtonClick} className="edit-button">Edit profile</button>
        ) : (
          <button className="follow-button">Follow</button>
        )}
        <h2 className="profile-name">{profileData.username}</h2>
        <h3 className="profile-username">@{profileData.nickname}</h3>
        <p >{profileData.about}</p>
        <ul>
          <li>{profileData.employment}</li>
          <li>{profileData.city}</li>
          <li>{profileData.web}</li>
          <li>{profileData.registerDate}</li>
        </ul>

        <div>
          <li><Link to={`/following${ id }`}>Following</Link>: {profileData.followingCount}</li>
          <li><Link to={`/followers${ id }`}>Followers</Link>: {profileData.followersCount}</li>
          {showEdit && (
            <div>
              <EditProfile profileData={profileData} />
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          )}
        </div>

      </div>
      <div>
        {tweets.map(tweet => (
          <div key={tweet._id} className="get-tweets">
            <h3>{tweet.username}</h3>
            <p>{tweet.nickname}</p>
            <p>
              {tweet.text.split(' ').map((word, index) =>
              {
                if (word.startsWith('#'))
                {
                  return (
                    <Link key={index} to={`/hashtags/${ word.slice(1) }`}>{word} </Link>
                  );
                } else
                {
                  return `${ word } `;
                }
              })}
            </p>
            <p>{tweet.createdAt}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;












