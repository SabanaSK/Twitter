import React, { useState } from 'react';
import axios from 'axios';




const EditProfile = ({ profileData }) => {
  const [formData, setFormData] = useState({
    _id: profileData ? profileData._id : '',
    username: profileData ? profileData.username : '',
    nickname: profileData ? profileData.nickname : '',
    about: profileData ? profileData.about : '',
    employment: profileData ? profileData.employment : '',
    city: profileData ? profileData.city : '',
    web: profileData ? profileData.web : ''
  });

  console.log()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    console.log('Button clicked')
    try {
      const response = await axios.put(`http://localhost:3001/profile/${formData._id}`, formData);
      console.log(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSaveChanges();
    window.location.reload()
  };

  if (!profileData) {
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
