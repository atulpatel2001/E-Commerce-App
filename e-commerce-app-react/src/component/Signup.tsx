/**
 * Signup component in this file user register and save data in backend
 */

import React, {  useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../hook/UserAlert';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const showAlert = useAlert();
  /**
   * Handle Register Data form react event and call register user function
   * @param e
   */


  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password, phone).then((data)=>{
        showAlert('Signup successful!', 'success');
       }).catch((error)=>{
        showAlert('Signup failed!', 'error');

      });
      navigate('/login');
    } catch (error) {
      console.error('Registration Failed:', error);
      showAlert('Signup failed!', 'error');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleRegister} mt={8}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <TextField
          
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </Box>
    </Container>
  );
};

export default Signup;
