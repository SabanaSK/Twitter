import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";


const FollowingList = () => {
  const { id } = useParams();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}/following`);
        setFollowing(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowing();
  }, [id]);

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {following.map((followedUser) => (
          <li key={followedUser._id}> <Link to={`/users/profile/${followedUser._id}`}>{followedUser.username} </Link> </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
