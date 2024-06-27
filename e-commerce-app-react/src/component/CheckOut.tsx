import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Select, MenuItem, Button } from '@mui/material';
import { useAlert } from '../hook/UserAlert';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import {clearCart } from '../redux/CartSlice';
import { useNavigate } from 'react-router-dom';
const Checkout: React.FC = () => {
    const showAlert = useAlert();
    const dispatch = useDispatch<AppDispatch>();
    const navigate=useNavigate();

  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    email: '',
    address: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPersonalDetails({
      ...personalDetails,
      [name]: value
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPaymentMethod(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     resetForm();
    showAlert('successfully CheckOut!', 'success');
    dispatch(clearCart());
    navigate('/products')


  };

  const resetForm = () => {
    setPersonalDetails({
      fullName: '',
      email: '',
      address: ''
    });
    setPaymentMethod('');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} bgcolor="background.paper" boxShadow={2} borderRadius={8}>
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="fullName"
            value={personalDetails.fullName}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={personalDetails.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={personalDetails.address}
            onChange={handleInputChange}
            multiline
            rows={3}
            required
          />
          <Select
            label="Payment Method"
            variant="outlined"
            fullWidth
            value={paymentMethod}
            onChange={(event) => handleSelectChange(event as React.ChangeEvent<{ value: unknown }>)}
            required
          >
            <MenuItem value="" disabled>
              Select Payment Method
            </MenuItem>
            <MenuItem value="creditCard">Credit Card</MenuItem>
            <MenuItem value="paypal">Cash On Delivery</MenuItem>
            <MenuItem value="bankTransfer">Check</MenuItem>
          </Select>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Place Order
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Checkout;
