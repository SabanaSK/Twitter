import React from 'react'
import { Link } from 'react-router-dom';
import classes from './Start.module.css'

export default function StartPage() {
  const imagePath = process.env.PUBLIC_URL + './img/greentwitt.png';
  const imagePathUser = process.env.PUBLIC_URL + './img/greenuser.jpg';

  return (
    <>
      <div className={classes.heading}>
        <img src={imagePath} alt="example" style={{
          width: '50px', height:
            '50px'
        }} />
        <h1>Twitter</h1>
        
      </div>
      <div className={classes.user}>
        <span>
          <img src={imagePathUser} alt='user-example' style={{
            width: '100px',
            height: '100px'
          }} />
        </span>
        <Link to="/register" className={classes.btnregister}>Registred</Link>
        <Link to="/login" className={classes.btnlogin}>Login</Link>
      </div>



    </>
  )
}
