/**
 * NavBar Component
 */

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logOut } from '../services/authService';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';
import { useAlert } from '../hook/UserAlert';
const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const showAlert = useAlert();

  /**
   * Logout Request Handle call Logout api
   */

  const handleLogout = async () => {
   await logOut();
    dispatch(logout());
    showAlert('Logout successfully!', 'success');

  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/cart">Cart</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        {user.isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
