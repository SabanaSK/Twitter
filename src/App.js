import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from './Components/StartPage/StartPage';
import LoginPage from './Components/LogInLogOut/LoginPage';
import RegisterUser from './Components/RegistreUser/RegisterUser';
import ProfilePage from './Components/ProfilePages/MyProfilePage';
import EditPage from './Components/ProfilePages/EditPage'
import LogOut from './Components/LogInLogOut/LogOut';
import Home from './Components/Home/Home'


function App ()
{

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/register" exact element={<RegisterUser onRegisterUser />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
