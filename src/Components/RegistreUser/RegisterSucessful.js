import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './RegisterSucessful.css';
import Card from './card';

const RegisterSucessful = (props) =>
{
  const navigate = useNavigate();

  const handleLoginClick = () =>
  {
    navigate('/login');
  };

  return (
    <Card className={classes.welcomecard}>
      <h1>Register successfully!</h1>
      <button type='button' onClick={handleLoginClick}>Login</button>
    </Card>
  );
};

export default RegisterSucessful;




