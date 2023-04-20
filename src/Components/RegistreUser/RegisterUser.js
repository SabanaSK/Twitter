
// import React, {useState}from 'react';
// import classes from './Register.module.css'
// import Button from './Button';
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// export default function RegisterUser(props) {
  
//   const [enteredEmail, setEnteredEmail] = useState('');
//    const [emailIsValid, setEmailIsValid] = useState();
//   const [enteredUserName, setEnteredUserName] = useState('');
//   // const [userNameIsIsValid, setUserNameIsValid] = useState();
//   const [enteredPassword, setEnteredPassword] = useState('');
//   const [passwordIsValid, setPasswordIsValid] = useState();
//   const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
//    const [formIsValid, setFormIsValid] = useState(false)
//   const emailChangeHandler=(event)=>{
//      setEnteredEmail(event.target.value);
//      setFormIsValid(
//       event.target.value.includes('@') && enteredPassword.trim().length > 6
//     );
//   }
//   const userNameChangeHanlder = (event) => {
//   const enteredValue = event.target.value;
//   let isValid = true;
  
//   if (enteredValue.trim() === '') {
//     isValid = false;
//   }
  
//   setEnteredUserName(enteredValue);
//   setFormIsValid(isValid);
// };
//   const passwordChangeHandler = (event) => {
//   const enteredValue = event.target.value.trim();
//   setEnteredPassword(enteredValue);
//   setFormIsValid(enteredValue.length > 6 && enteredEmail.includes('@'));
// };
//   const confirmPasswordChangeHandler=(event)=>{
// setEnteredConfirmPassword(event.target.value)
// setFormIsValid(enteredPassword===enteredConfirmPassword);
//   };
//   const validateEmailHandler = () => {
//     setEmailIsValid(enteredEmail.includes('@'));
//   };
//    const validatePasswordHandler = () => {
//     setPasswordIsValid(enteredPassword.trim().length > 6);
//   };
//   const submitHandler =(event)=>{
//     event.preventDefault();
//     props.onRegisterUser(enteredEmail,enteredPassword,enteredUserName);
//   }

//   return (
//     <div className={classes.register}>
//     <form className={classes.form} onSubmit={submitHandler}>
//       <h1>Registration</h1>
      
     
//       <div
//           className={`${classes.control} ${
//             emailIsValid === false ? classes.invalid : ''
//           }`}
//         ></div>
//      {/* <label id="icon" htmlFor="name"><i className="fas fa-envelope"></i></label> */}
//       <input 
//       type="email" 
//       id="email"
//       value={enteredEmail}
//       onChange={emailChangeHandler}
//       onBlur={validateEmailHandler}
//       placeholder="Email" 
//       required/>
      
//       {/* <label id="icon" htmlFor="name"><i className="fas fa-user"></i></label> */}
//       <label className='username' htmlFor='username'></label>
//       <input type="text"
//        name="username" 
//        id="username"
//        value={enteredUserName}
//        onChange={userNameChangeHanlder}
       
//         placeholder="Name *" required/>
        
//         <div
//           className={`${classes.control} ${
//             passwordIsValid === false ? classes.invalid : ''
//           }`}
//         ></div>

//       {/* <label id="icon" htmlFor="name"><i className="fas fa-unlock-alt"></i></label> */}
//       <label className='' htmlFor='password'></label>

//       <input type="password" id="password"
//       value={enteredPassword}
//       onChange={passwordChangeHandler}
//       onBlur={validatePasswordHandler}
//        placeholder="Password *" 
//        required/> 

//       <input type="password" id="password" 
//       value={enteredConfirmPassword}
//       onChange={confirmPasswordChangeHandler}
// placeholder="Confirm Password" 
// required/> 
//       <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//             Registerd
//           </Button>
//           </div>
//       {/* <FontAwesomeIcon /> */}
//     </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import classes from "./Register.module.css";
import Button from "./Button";

export default function RegisterUser(props) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredUserName, setEnteredUserName] = useState("");
  const [userNameIsValid, setUserNameIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes("@") && passwordIsValid
    );
  };

  const userNameChangeHanlder = (event) => {
    const enteredValue = event.target.value;
    let isValid = true;

    if (enteredValue.trim() === "") {
      isValid = false;
    }

    setEnteredUserName(enteredValue);
    setUserNameIsValid(isValid);
    setFormIsValid(isValid && passwordIsValid && enteredEmail.includes("@"));
  };

  const passwordChangeHandler = (event) => {
    const enteredValue = event.target.value.trim();
    setEnteredPassword(enteredValue);
    setPasswordIsValid(enteredValue.length > 6);
    setFormIsValid(enteredEmail.includes("@") && enteredValue.length > 6 && enteredConfirmPassword === enteredValue);
  };

  const confirmPasswordChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
    setFormIsValid(enteredEmail.includes("@") && enteredPassword === event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validateUserNameHandler = () => {
    setUserNameIsValid(enteredUserName.trim() !== "");
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onRegisterUser(enteredEmail, enteredPassword, enteredUserName);
  };

  return (
    <div className={classes.register}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1>Registration</h1>

        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        ></div>
     {/* <label id="icon" htmlFor="name"><i className="fas fa-envelope"></i></label> */}
      <input 
      type="email" 
      id="email"
      value={enteredEmail}
      onChange={emailChangeHandler}
      onBlur={validateEmailHandler}
      placeholder="Email" 
      required/>
      
      {/* <label id="icon" htmlFor="name"><i className="fas fa-user"></i></label> */}
      
      <label className='username' htmlFor='username'></label>
      <div
          className={`${classes.control} ${
            userNameIsValid === false ? classes.invalid : ''
          }`}
        ></div>
      <input type="text"
       name="username" 
       id="username"
       value={enteredUserName}
       onChange={userNameChangeHanlder}
       onBlur={validateUserNameHandler}
       
        placeholder="Name *" required/>
        
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        ></div>

      {/* <label id="icon" htmlFor="name"><i className="fas fa-unlock-alt"></i></label> */}
      <label className='' htmlFor='password'></label>

      <input type="password" id="password"
      value={enteredPassword}
      onChange={passwordChangeHandler}
      onBlur={validatePasswordHandler}
       placeholder="Password *" 
       required/> 

      <input type="password" id="password" 
      value={enteredConfirmPassword}
      onChange={confirmPasswordChangeHandler}
placeholder="Confirm Password" 
required/> 
      <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Registerd
          </Button>
          </div>
      {/* <FontAwesomeIcon /> */}
    </form>
    </div>
  );
}
