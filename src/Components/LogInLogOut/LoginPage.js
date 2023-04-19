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
        <input type="text" placeholder='Username or Email' />
        <input type="password" placeholder='Password' />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;