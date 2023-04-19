
import React, { useState } from 'react';

const LoginPage = () => {
  //skapa variabler för att spara inloggningsuppgifter
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //skapa funktion för att logga in

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input type="text" />
        <label>Email</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
