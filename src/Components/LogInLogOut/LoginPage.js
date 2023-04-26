import React, { useState } from 'react';
import axios from 'axios';
import classes from './LogInLogout.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + './img/bluetwitt.png';
  const [loginDetails, setLoginDetails] = useState({
    emailOrUsername: '',
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

    try {
      const response = await axios.post("http://localhost:3001/login", {
        emailOrUsername: loginDetails.emailOrUsername,
        password: loginDetails.password,
      });
      if (response.status === 200) {
        // Login successful, set token and redirect to home page
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      if (error.response.status === 404) {
        setErrorMessage('Invalid email/username or password');
      } else {
        setErrorMessage('Something went wrong, please try again later');
      }
    }
  };

  return (
    <div className={classes.login}>
      <img
        className={classes.img}
        src={imagePath}
        alt="example"
        style={{
          width: '50px',
          height: '50px',
        }}
      />
      <div className={classes.form}>
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <input
            type="text"
            name="emailOrUsername"
            value={loginDetails.emailOrUsername}
            onChange={inputChangeHandler}
            placeholder="Email or Username"
          />
          <br />
          <input
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={inputChangeHandler}
            placeholder="Password"
          />
          <br />
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <Link
            to="/login"
            className={classes.button}
            onClick={loginHandler}
            disabled={!formIsValid}
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
