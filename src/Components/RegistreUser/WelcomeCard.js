import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './welcomecard.module.css';
import Card from './card';

const WelcomeCard = (props) =>
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

export default WelcomeCard;




