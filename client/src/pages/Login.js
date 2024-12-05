import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3234';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !login || !password) {
        setError('All fields are required');
        return;
    }

    axios
      .post('/api/auth/login', { email, login, password })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem('user', JSON.stringify(user)); // Save user info in localStorage
        localStorage.setItem('token', token); // Save token in localStorage
        setUser(user); // Update user state in App.js
        navigate('/'); // Redirect to home page after login
      })
      .catch((err) => {
        console.error('Login error:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.error || 'An error occurred');
      });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="login"
          variant="outlined"
          fullWidth
          value={login}
          onChange={(e) => setlogin(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </form>
    </Box>
  );
}

export default Login;
