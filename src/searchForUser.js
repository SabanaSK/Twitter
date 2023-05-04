import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setallUsers] = useState([]);

  const fetchAllUsers = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:3001/search?search=${searchQuery}`);
      setallUsers(response.data);
      console.log("helloe")
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
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchForFriends;















/*import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchForUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const debounce = (fn, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/homeuser?count=4&search=${searchQuery}`
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const debouncedFetchUsers = debounce(fetchUsers, 500);
    debouncedFetchUsers();
  }, [searchQuery]);

  return (
    <input
      type="text"
      className="search-box"
      placeholder="Search on Twitter..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchForUser;












/*const [searchQuery, setSearchQuery] = useState("");

const SearchForUser = () => {

    const fetchUsers = async (searchQuery) => {
        try {
          const response = await axios.get(
            `http://localhost:3001/homeuser?count=4&search=${searchQuery}`
          );
          setUsers(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      useEffect(() => {
        fetchUsers(searchQuery);
      }, [searchQuery]);
      

 return (
    <input
  type="text"
  className="search-box"
  placeholder="Search on Twitter"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
)
 }

export default SearchForUser; */