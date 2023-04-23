import React, { useState } from "react";
import classes from "./Register.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';


export default function RegisterUser (props)
{
  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");
  const [ emailIsValid, setEmailIsValid ] = useState();
  const [ username, setUsername ] = useState("");
  const [ userNameIsValid, setUsernameIsValid ] = useState();
  const [ password, setPassword ] = useState("");
  const [ passwordIsValid, setPasswordIsValid ] = useState();
  const [ formIsValid, setFormIsValid ] = useState(false);
  const formRef = useRef();

  const emailChangeHandler = (event) =>
  {
    setEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes("@") && passwordIsValid
    );
  };

  const userNameChangeHanlder = (event) =>
  {
    const enteredValue = event.target.value;
    let isValid = true;

    if (enteredValue.trim() === "" || enteredValue.includes(' '))
    {
      isValid = false;
    }

    setUsername(enteredValue);
    setUsernameIsValid(isValid);
    setFormIsValid(isValid && passwordIsValid && email.includes("@"));
  };

  const passwordChangeHandler = (event) =>
  {
    const enteredValue = event.target.value.trim();
    setPassword(enteredValue);
    setPasswordIsValid(enteredValue.length > 6);
    setFormIsValid(email.includes("@") && enteredValue.length > 6);
  };

  const validateEmailHandler = () =>
  {
    setEmailIsValid(email.includes("@"));
  };

  const validateUserNameHandler = () =>
  {
    setUsernameIsValid(username.trim() !== "");
  };

  const validatePasswordHandler = () =>
  {
    setPasswordIsValid(password.trim().length > 6);
  };

  const submitHandler = async (event) =>
  {
    event.preventDefault();
    setEmail('');
    setUsername('');
    setPassword('');

    const user = {
      email: email,
      password: password,
      username: username
    };


    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),

    });

    if (response.ok)
    {
      // Registration successful, redirect to login page
      navigate.push("/"); //homepages
      formRef.current.reset();
    } else
    {
      // Registration failed, display error message
      const data = await response.json();
      console.log(data.message);
    }

  };


  return (
    <div className={classes.register}>
      <form className={classes.form} onSubmit={submitHandler} ref={formRef} >
        <h1>Registration</h1>

        <div
          className={`${ classes.control } ${ emailIsValid === false ? classes.invalid : ''
            }`}
        ></div>

        <input
          type="email"
          id="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          placeholder="Email"
          required />



        <label className='username' htmlFor='username'></label>
        <div
          className={`${ classes.control } ${ userNameIsValid === false ? classes.invalid : ''
            }`}
        ></div>
        <input type="text"
          name="username"
          id="username"
          value={username}
          onChange={userNameChangeHanlder}
          onBlur={validateUserNameHandler}

          placeholder="Name *" required />

        <div
          className={`${ classes.control } ${ passwordIsValid === false ? classes.invalid : ''
            }`}
        ></div>


        <label className='' htmlFor='password'></label>

        <input type="password" id="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          placeholder="Password *"
          required />


        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Registerd
          </Button>
        </div>

      </form>
    </div>
  );
}
