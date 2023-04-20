import React, { useState } from 'react';

import classes from './LogInLogout.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const imagePath = process.env.PUBLIC_URL + './img/greentwitt.png';
  const [loginDetails, setLoginDetails] = useState({
    emailOrUsername: '',
     password: ''
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const inputChangeHandler = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value.trim();

    setLoginDetails((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue
      }
    });
    if (fieldName === 'emailOrUsername') {
      setFormIsValid(fieldValue !== '');
    } else if (fieldName === 'password') {
      setFormIsValid(fieldValue !== '' && loginDetails.emailOrUsername !== '');
    }
  }
  const loginHandler = (event) => {
  event.preventDefault();

  
  if (loginDetails.emailOrUsername === 'example@gmail.com' && loginDetails.password === 'password') {
    console.log('Login successful');
    
  } else {
    console.log('Login failed');
    
  }
}
const handleLoginClick=() =>{
  if(formIsValid){
    navigate.push('/login');
  }
};
  

  

  return (
    <div className={classes.login}>
    <img className={classes.img}src={imagePath} alt="example" style={{
          width: '50px', height:
            '50px'
        }} />
     <div className={classes.form}> 
    
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <input 
          type="text" 
          name="emailOrUsername"
          value={loginDetails.emailOrUsername}
          onChange={inputChangeHandler}
          placeholder='Email or Username' 
        /><br/>
        <input 
          type="password"
          name="password"
          value={loginDetails.password}
          onChange={inputChangeHandler} 
          placeholder='Password' 
        /><br/>
        
        
        <Link
            to="/login"
            className={classes.button}
            onClick={handleLoginClick}
            disabled={!formIsValid}
          >
            Login
          </Link>
      </form>
    </div>
    </div>
  );
}


// import React, { useState } from 'react';

// const LoginPage = () => {
//   //skapa variabler för att spara inloggningsuppgifter
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   // const [password, setPassword] = useState('');
//   //skapa funktion för att logga in
//   const usernameChangeHandler=(event)=>{
//     setUsername(event.target.value);
    
//     if (username.trim() === "" || enteredValue.includes(' ')) {
//       isValid = false;
//     }
//   }
//   const emailChangeHandler = (event) => {
//     setEmail(event.target.value);
//     setFormIsValid(
//       event.target.value.includes("@") ||
//     );
//   };
//   // const passwordChangeHandler = (event) => {
//   //   const enteredValue = event.target.value.trim();
//   //   setPassword(enteredValue);
//   //   setPasswordIsValid(enteredValue.length > 6);
    
//   // };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form>
//         <input type="text" 
//         id='username'
//         value={username}
//         onChange={usernameChangeHandler}
//         placeholder='Username or Email' />
//         <input type="password"
//         id='password'
//         value={password}
//         onChange={passwordChangeHandler} 
//         placeholder='Password' />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
