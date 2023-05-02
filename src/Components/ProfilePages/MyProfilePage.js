/*import classes from './MyProfile.module.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import EditProfile from '../Profile/EditPage.js';

const imagePathUser = process.env.PUBLIC_URL + '../img/greenuser.jpg';


const ProfilePage = () => {
    //const [userTweets, setUserTweets] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
  
    const { id } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userProfile = await axios.get(`http://localhost:3001/profile/${id}`);
          //const userTweets = await axios.get(/users/find/${id});
  
          //setUserTweets(userTweets.data);
          setUserProfile(userProfile.data);
        } catch (err) {
          console.log("error", err);
        }
      };
  
      fetchData();
    }, [id]);

    const handleEditButtonClick = () => {
        setShowEdit(true);

    }

    const handleCancelClick = () => {
        setShowEdit(false);
    }

    
  
    return (
      <div className={classes.userProfile}>
        <img className={classes.impProfile} src={imagePathUser} alt='user-example' />
        <h2 className={classes.name}>{userProfile && userProfile.username}</h2>
        <div className={classes.container}>
          <h5 className={classes.nick}>{userProfile && userProfile.nickname}</h5>
          <button onClick={handleEditButtonClick}>Edit</button>

        </div>
        <p className={classes.about}>{userProfile && userProfile.about}</p>
        <ul className={classes.list}>
          <div className={classes.containerTwo}>
            <p>Här är jag</p>
            <li>{userProfile && userProfile.employment}</li>
            <li>{userProfile && userProfile.city}</li>
            <li>{userProfile && userProfile.web}</li>
            <li>{userProfile && userProfile.registerDate}</li>
          </div>
          <div className={classes.containerTwo}>
            <li><Link to={`/following${id}`}>Following</Link></li>
            <li><Link to={`/followers${id}`}>Followers</Link></li>
          </div>
        </ul>

        {showEdit && (
            <div>
                <EditProfile userProfile={userProfile} />
                <button onClick={handleCancelClick}>Cancel</button>
            </div>
          )}
      </div>
    )
    
  }
  
  export default ProfilePage;*/
