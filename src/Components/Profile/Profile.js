import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import "./Profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();

  const [profileData, setProfileData] = useState(null);

  const jwt = localStorage.getItem("token");
  const loggedUserId = jwt ? jwt_decode(jwt).userId : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [userId]);

  if (!profileData) {
    return <p>Loading...</p>;
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
        {userId === loggedUserId ? (
          <button className="edit-button">Edit profile</button>
        ) : (
          <button className="follow-button">Follow</button>
        )}
        <h2 className="profile-name">{profileData.name}</h2>
        <h3 className="profile-username">@{profileData.username}</h3>

      </div>
    </div>
  );
};

export default Profile;
