import React from 'react';
import NavMenu from '../NavMenu/NavMenu';
import TweetsList from '../TweetList/TweetsList';
import TrendingHashtags from '../TrendingHashtags/TrendingHashtags';
import './Home.css';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from '../Profile/Profile';

<<<<<<< HEAD
const Home = () =>
{
  const [ users, setUsers ] = useState(null);// here is null first

  useEffect(() =>
  {
    const fetchUsers = async () =>
    {
      try
      {
        const response = await axios.get("http://localhost:3001/homeuser?count=4");
        setUsers(response.data);
      } catch (error)
      {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);
=======
const Home = () => {

>>>>>>> 8944ca2bc18807d12b0fcd3eb6781df0df27bac7

  return (
    <div className="home">
      <div className="home-left-section">
        <NavMenu />
      </div>
      <div className="home-main-section">
        <Routes>
          <Route path="/" element={<TweetsList />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
<<<<<<< HEAD
        <div>
          {users ? (
            <div>
              {users.map(user => (
                <div key={user.id}>
                  <h2>{user.username}</h2>
                  <h4>{user.nickname}</h4>
                  <p>{user.followers}</p>
                  <p>{user.city}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
=======
>>>>>>> 8944ca2bc18807d12b0fcd3eb6781df0df27bac7
      </div>
      <div className="home-right-section">
        <input
          type="text"
          className="search-box"
          placeholder="Search on Twitter"
        />
        <TrendingHashtags />
      </div>
    </div>
  );
};

export default Home;
