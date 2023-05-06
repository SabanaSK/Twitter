import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from './Components/StartPage/StartPage';
import LoginPage from './Components/LogInLogOut/LoginPage';
import RegisterUser from './Components/RegistreUser/RegisterUser';
import EditPage from './Components/Profile/EditPage'
import LogOut from './Components/LogInLogOut/LogOut';
import Home from './Components/Home/Home'
import OtherUserProfileLayout from './Components/OtherUsersProfiles/OtherUserProfileLayout';
import FollowersList from './Components/Follow/Followers';
import FollowingList from './Components/Follow/Following';
import HashTagPage from './Components/Hashtag/HashTagPage';

function App ()
{

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterUser onRegisterUser />} />
        <Route path="/users/profile/:id" exact element={<OtherUserProfileLayout />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/hashtags/:hashtag/*" element={<HashTagPage />} />
        <Route path="/users/:id/followers" element={<FollowersList />} />
        <Route path="/users/:id/following" element={<FollowingList />} />

      </Routes>
    </>
  );
};

export default App;
