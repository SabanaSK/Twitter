import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const FollowersList = () => {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}/followers`);
        setFollowers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowers();
  }, [id]);

  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map((follower) => (

          <li key={follower._id}>  <Link to={`/users/profile/${follower._id}`}> {follower.username}</Link></li>

        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
