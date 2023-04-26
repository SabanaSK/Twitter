

import React from 'react'

import classes from './welcomecard.module.css'
import Card from './card';

const WelcomeCard = (props) =>
{
  return (
    <Card className={classes.welcomecard}>
      <h1>Register successfully!</h1>

    </Card>
  )
}
export default WelcomeCard;
