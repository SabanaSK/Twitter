import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setallUsers] = useState([]);

  const fetchAllUsers = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:3001/users?search=${searchQuery}`);
      setallUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search on Twitter..."
      />
      <ul>
        {allUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchForFriends;   