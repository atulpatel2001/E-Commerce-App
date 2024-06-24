/**
 * NavBar Component
 */

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../services/CookiesService';
import { logOut } from '../services/authService';
import { RootState } from '../redux/store';

import { logout } from '../redux/UserSlice';

const Navbar: React.FC = () => {
  const token: string | undefined = getToken();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  /**
   * Logout Request Handle call Logout api
   */

  const handleLogout = async () => {
    logOut(token);
    logout();

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
        {isLoggedIn ? (
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
