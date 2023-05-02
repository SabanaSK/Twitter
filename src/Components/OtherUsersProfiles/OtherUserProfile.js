

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

import classes from './OtherUsersProfile.module.css';
import { Link } from "react-router-dom";
const OtherUserProfilePage = ({ match, currentUser }) =>
{
  const [ userData, setUserData ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);
  const imgPath = process.env.PUBLIC_URL + 'img/twitt.jpg';
  // const imgPath1 = process.env.PUBLIC_URL + 'img/bluetwitt.png';

  useEffect(() =>
  {
    const fetchUserData = async () =>
    {
      try
      {
        const response = await axios.get(`http://localhost:3001/users/${ match.params.id }`);
        setUserData(response.data);
        setIsLoading(false);
      } catch (error)
      {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, []);
  const handleFollow = async () =>
  {
    console.log("Button clicked");
    try
    {
      await axios.post(`http://localhost:3001/users/${ match.params.id }/followers`, {
        followerId: currentUser.id
      });
      // Update the user data in the state to reflect the increase in the number of followers
      setUserData(prevState => ({
        ...prevState,
        followers: prevState.followers + 1
      }));

    } catch (error)
    {
      console.log(error.message);
      console.log("Hello r u there?");

    }
  }
  return (
    <>
      {/* {isLoading ? (
        <p>Loading user data...</p>
      ) : ( */}
      {/* <div className={classes.container}> */}
      {/* <div className={classes.imgtwitt}>
        <img src={imgPath1} alt="twitt" />
      </div> */}
      <div className="home">
        <div className={classes.homelefsection}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>



        <div className={classes.homemainsection}>
          <div className={classes.backgroundimg}>
            <div className="img-container">
              <div className={classes.profilepicture}>
                <img src={imgPath} alt="img" />
              </div>
              <div className={classes.profileInfo}>
                <div className={classes.infoItem}>
                  <FaUser className={classes.infoIcon} />
                  <span className={classes.infoText}>{userData.username}</span>
                </div>
                <div className={classes.infoItem}>
                  <FaUser className={classes.infoIcon} />
                  <span className={classes.infoText}>{userData.nickname}</span>
                </div>
                <div className={classes.infoItem}>
                  <FaMapMarkerAlt className={classes.infoIcon} />
                  <span className={classes.infoText}>{userData.city}</span>
                </div>
                <div className={classes.infoItem}>
                  <FaUsers className={classes.infoIcon} />

                  <span className={classes.infoText}>{userData.followers || 0} followers</span>

                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button onClick={handleFollow}>Follow</button>
          </div>
        </div>

        <div className={classes.homerightsection}>
          <input
            type="text"
            className="search-box"
            placeholder="Search on Twitter"
          />
        </div>
      </div>

      {/* </div> */}
      {/* )} */}
    </>
  );
};

export default OtherUserProfilePage;




