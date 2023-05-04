
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchForFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [searchStarted, setSearchStarted] = useState(false);

  const fetchAllUsers = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:3001/search?search=${searchQuery}`);
      setAllUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchStarted) {
      fetchAllUsers(searchQuery);
    }
  }, [searchQuery, searchStarted]);

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchStarted(true);
  };

  

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search on Twitter..."
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default SearchForFriends;





