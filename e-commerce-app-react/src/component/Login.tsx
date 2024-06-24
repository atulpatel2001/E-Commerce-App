/**
 * Login Component
 * 
 * Show Login design and call api
 */

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';
import {  AppDispatch } from '../redux/store';
const Login: React.FC = () => {


  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * get form input data and call loginuser function for call node js api
   * @param event
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log('Login Successful:', response);
      const { _id } = response; 

      dispatch(login(_id));
      navigate("/products");

    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleLogin} mt={8}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </Box>
    </Container>
  );
};

export default Login;
