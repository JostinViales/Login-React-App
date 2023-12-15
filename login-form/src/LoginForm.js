import React, { useState } from 'react';
import AdminPanel from './AdminPanel'

const LoginForm = ({ onLogin }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error(`Failed to fetch: ${response.status} - ${response.statusText}`);
      alert('Invalid Credentials')
      return;
    }

    const data = await response.json();

    if (data.success) {
      onLogin(); // Notify the parent component that login is successful
    } else {
      console.error(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};


const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <AdminPanel />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Login;
