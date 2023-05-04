import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from './Components/StartPage/StartPage';
import LoginPage from './Components/LogInLogOut/LoginPage';
import RegisterUser from './Components/RegistreUser/RegisterUser';
import EditPage from './Components/Profile/EditPage'
import LogOut from './Components/LogInLogOut/LogOut';
import Home from './Components/Home/Home'
import OtherUserProfilePage from './Components/OtherUsersProfiles/OtherUserProfile';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterUser onRegisterUser />} />
        <Route path="/users/:id" exact element={<OtherUserProfilePage />} />

        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
