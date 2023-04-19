
import React from 'react';
import classes from './Register.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function RegisterUser() {
  return (
    <div className={classes.main}>
    <form className={classes.form}>
      <h1>Registration</h1>
      
      <div className='adjust'>  
     <label id="icon" htmlFor="name"><i className="fas fa-envelope"></i></label>
      <input type="text" name="name" id="name" placeholder="Email" required/>
      </div>
      <label id="icon" htmlFor="name"><i className="fas fa-user"></i></label>
      <label className='username' htmlFor='username'></label>
      <input type="text" name="username" id="username" placeholder="Name" required/>
      <label id="icon" htmlFor="name"><i className="fas fa-unlock-alt"></i></label>
      <label className='' htmlFor='password'></label>
      <input type="password" name="password" id="password" placeholder="Password" required/> 
      <input type="password" name="password" id="password" placeholder="Confirm Password" required/> 
      <button type="submit">Submit</button>
      <FontAwesomeIcon />
    </form>
    </div>
  );
}
