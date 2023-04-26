import React, { useState } from 'react';
import axios from 'axios';
import classes from './LogIn.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + './img/bluetwitt.png';
  const location = useLocation();
  const [loginDetails, setLoginDetails] = useState({
    emailOrUsername: location.state ? location.state.emailOrUsername : '',
    password: '',
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputChangeHandler = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value.trim();

    setLoginDetails((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
      };
    });

    if (fieldName === 'emailOrUsername') {
      setFormIsValid(fieldValue !== '' && loginDetails.password !== '');
    } else if (fieldName === 'password') {
      setFormIsValid(fieldValue !== '' && loginDetails.emailOrUsername !== '');
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    loginAttempt();
  };

  async function loginAttempt() {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: loginDetails.emailOrUsername,
        username: loginDetails.emailOrUsername,
        password: loginDetails.password,
      });
      if (response.status === 200) {
        // Login successful, set token and redirect to home page
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      if (error.response.status === 404) {
        setErrorMessage('Invalid email/username or password');
      } else {
        setErrorMessage('Something went wrong, please try again later');
      }
    }
  }

  return (
    <div className={classes.login}>

      <div className={classes.form}>
        <img
          className={classes.img}
          src={imagePath}
          alt="example"
        />
        <h1 className={classes.loginH1}>Login to Twitter</h1>
        <form>
          <input
            type="text"
            name="emailOrUsername"
            className={classes.loginInput}
            value={loginDetails.emailOrUsername}
            onChange={inputChangeHandler}
            placeholder="Username or Email"
            disabled={location.state ? true : false}
          />
          <input
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={inputChangeHandler}
            placeholder="Password"
          />
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <button
            className={classes.button}
            onClick={loginHandler}
            disabled={!formIsValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}