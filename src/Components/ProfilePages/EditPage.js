import classes from './Edit.module.css'
import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';


const EditProfile = ({ userProfile }) => {
  const [formData, setFormData] = useState({
    username: userProfile ? userProfile.username : '',
    nickname: userProfile ? userProfile.nickname : '',
    about: userProfile ? userProfile.about : '',
    employment: userProfile ? userProfile.employment : '',
    city: userProfile ? userProfile.city : '',
    web: userProfile ? userProfile.web : ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/profile/${userProfile.id}`, formData);
      console.log(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSaveChanges();
    // TODO: Add code to submit form data to server
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Name:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="nickname">Nickname:</label>
        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="about">About:</label>
        <textarea name="about" value={formData.about} onChange={handleChange}></textarea>
      </div>
      <div>
        <label htmlFor="employment">Employment:</label>
        <input type="text" name="employment" value={formData.employment} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="web">Web:</label>
        <input type="text" name="web" value={formData.web} onChange={handleChange} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;
