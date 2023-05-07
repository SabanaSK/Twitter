
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchForFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [searchStarted, setSearchStarted] = useState(false);
  const [allHashtags, setAllHashtags] = useState([]);


  const fetchAllUsersAndHashtags = async (searchQuery) => {
    try {
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const response = await axios.get(`http://localhost:3001/search?search=${encodedSearchQuery}`);
      setAllUsers(response.data.users);

      if (searchQuery.startsWith('#')) {
        setAllHashtags(response.data.hashtags);
      } else {
        setAllHashtags([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (searchStarted) {
      fetchAllUsersAndHashtags(searchQuery);
    }
  }, [searchQuery, searchStarted]);

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const filteredHashtags = allHashtags.filter((hashtag) =>
      hashtag._id.toLowerCase().startsWith(searchQuery.toLowerCase())
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

{searchQuery.length > 0 && (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user._id}>
              <Link to={`/users/profile/${user._id}`}>{user.username}</Link>
            </li>
          ))}
        </ul>
      )}

      {searchQuery.startsWith('#') && searchQuery.length > 1 && (
          <ul>
            {filteredHashtags.map((hashtag) => (
                <li key={hashtag.name}>
                  <Link to={`/hashtags/${hashtag._id.slice(1)}`}>{hashtag._id}</Link>
                </li>
            ))}
          </ul>
      )}

    </div>
  );
};



export default SearchForFriends;





