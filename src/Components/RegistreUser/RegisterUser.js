import React, { useState } from "react";
import classes from "./Register.module.css";
import Classes from './card.module.css'
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./card";
import WelcomeCard from "./WelcomeCard";




export default function RegisterUser (props)
{
  const imagePath = process.env.PUBLIC_URL + './img/bluetwitt.png';
  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");
  const [ emailIsValid, setEmailIsValid ] = useState();
  const [ username, setUsername ] = useState("");
  const [ userNameIsValid, setUsernameIsValid ] = useState();
  const [ password, setPassword ] = useState("");
  const [ passwordIsValid, setPasswordIsValid ] = useState();
  const [ confirmpassword, setConfirmPassword ] = useState("");
  const [ confirmpasswordIsValid, setConfirmPasswordIsValid ] = useState();
  const [ formIsValid, setFormIsValid ] = useState(false);
  const [ isRegistered, setIsRegistered ] = useState(false); // new state variable

  const emailChangeHandler = (event) =>
  {
    setEmail(event.target.value);
    setFormIsValid(event.target.value.includes("@") && passwordIsValid);
  };



  const passwordChangeHandler = (event) =>
  {
    const enteredValue = event.target.value.trim();
    setPassword(enteredValue);
    setPasswordIsValid(enteredValue.length > 6);
    setFormIsValid(email.includes("@") && enteredValue.length > 6);
  };
  const confirmpasswordChangeHandler = (event) =>
  {
    const enteredValue = event.target.value.trim();
    setConfirmPassword(enteredValue);
    setConfirmPasswordIsValid(enteredValue.length > 6);
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
  const validateConfirmPasswordHandler = () =>
  {
    setConfirmPasswordIsValid(password.trim().length > 6);
  };

  function userNameChangeHandler (event)
  {
    const enteredValue = event.target.value;
    let isValid = true;

    if (enteredValue.trim() === "" || enteredValue.includes(" "))
    {
      isValid = false;
    }

    setUsername(enteredValue);
    setUsernameIsValid(isValid);
    setFormIsValid(isValid && passwordIsValid && email.includes("@"));
  }


  const submitHandler = async (event) =>
  {
    event.preventDefault();
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");

    const user = {
      email: email,
      username: username,
      password: password,
      confirmpassword: confirmpassword,
    };

    try
    {
      const response = await axios.post("http://localhost:3001/register", user);

      if (response.status === 201)
      {
        // Registration successful, redirect to login page
        setIsRegistered(true);
        navigate.push("/"); //homepages
      }
    } catch (error)
    {
      // Registration failed, display error message
      console.log(error.message);
    }
  };

  return (
    <>
      <img className='img' src={imagePath} alt="example" style={{
        width: '50px', height:
          '50px'
      }} />
      {isRegistered ? (
        <WelcomeCard />
      ) : (

        <Card className={Classes.register}>

          <form className={classes.form} onSubmit={submitHandler}>
            <h1>Create An Account</h1>

            <div
              className={`${ classes.control } ${ emailIsValid === false ? classes.invalid : ""
                }`}
            >
              <input
                type="email"
                id="email"
                value={email}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                placeholder="Email"
                required
              />
            </div>

            <div
              className={`${ classes.control } ${ userNameIsValid === false ? classes.invalid : ""
                }`}
            >
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={userNameChangeHandler}
                onBlur={validateUserNameHandler}
                placeholder="Name *"
                required
              />
            </div>

            <div
              className={`${ classes.control } ${ passwordIsValid === false ? classes.invalid : ""
                }`}
            >
              <input
                type="password"
                id="password"
                value={password}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                placeholder="Password *"
                required
              />
            </div>
            <div
              className={`${ classes.control } ${ confirmpasswordIsValid === false ? classes.invalid : ""
                }`}
            >
              <input
                type="password"
                id="confirmpassword"
                value={confirmpassword}
                onChange={confirmpasswordChangeHandler}
                onBlur={validateConfirmPasswordHandler}
                placeholder="confirmPassword *"
                required
              />
            </div>

            <div className={classes.actions}>
              <Button
                type="submit"
                className={classes.btn}
                disabled={!formIsValid}
              >
                Register
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
}