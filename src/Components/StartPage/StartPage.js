import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import classes from './Start.module.css';

export default function StartPage ()
{
  const navigate = useNavigate();
  const [ loginInfo, setLoginInfo ] = useState({
    emailOrUsername: '',
  });
  const [ formIsValid, setFormIsValid ] = useState(false);

  const inputChangeHandler = (event) =>
  {
    const fieldValue = event.target.value.trim();

    setLoginInfo((prevState) =>
    {
      return {
        ...prevState,
        emailOrUsername: fieldValue,
      };
    });

    setFormIsValid(fieldValue !== '');
  };

  const nextPageHandler = (event) =>
  {
    event.preventDefault();
    navigate('/login', {
      state: {
        emailOrUsername: loginInfo.emailOrUsername
      }
    });
  };
  const registerHandler = () =>
  {
    navigate('/register');
  }

  return (
    <div className={classes.login}>
      <div className={classes.form}>
        <img
          className={classes.img}
          src={process.env.PUBLIC_URL + './img/bluetwitt.png'}
          alt="example"
          style={{
            width: '50px',
            height: '50px',
          }}
        />
        <h1 className={classes.loginH1}>Login to Twitter</h1>
        <form onSubmit={nextPageHandler}>
          <input
            type="text"
            name="emailOrUsername"
            value={loginInfo.emailOrUsername}
            onChange={inputChangeHandler}
            placeholder="Email or Username"
          />
          <br />
          <div className={classes.div}>
            <button type="submit" className={classes.button}>
              Next
            </button>
            <h1 className={classes.loginH1}>New to Twitter?</h1>
            <button className={classes.button} onClick={registerHandler}>
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



