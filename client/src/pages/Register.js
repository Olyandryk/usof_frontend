import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3234';

function Register({ setUser }) {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(''); // Changed to 'login' to match the backend
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/auth/register', { email, login, password, password_confirmation }) // Send 'login' instead of 'username'
      .then((response) => {
        // Automatically log the user in after successful registration
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user)); // Save user info in localStorage
        setUser(user); // Update user state in App.js
        navigate('/'); // Redirect to home page after registration
      })
      .catch((err) => {
        setError('Failed to register');
        console.error('Register error:', err);
      });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>
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
          label="Login"  // Changed to 'Login' to match the backend
          variant="outlined"
          fullWidth
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
        <TextField
          label="Password confirmation"
          type="password_confirmation"
          variant="outlined"
          fullWidth
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          sx={{ mb: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth>Register</Button>
      </form>
    </Box>
  );
}

export default Register;
