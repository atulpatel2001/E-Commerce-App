/**
 * Routes Component put all routes
 */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Login from './Login';
import Signup from './Signup';
import ProductForm from './ProductForm';
import Home from './Home';
import Checkout from './CheckOut';
import Contact from './Contact';


const RoutesComponent: React.FC = () => {


  return (
    <Router>
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Box flex="1">
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct" element={<ProductForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
     
         
          
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default RoutesComponent;