import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from './Components/StartPage/StartPage';
import LoginPage from './Components/LogInLogOut/LoginPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
