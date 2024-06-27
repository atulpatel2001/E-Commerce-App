/**
 * Footer Component
 */

import React from 'react';

import {
  Container,
  Grid,
  Box,
  Typography,
  Link,
  IconButton,
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
        
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Typography variant="body2">
              We are a leading e-commerce platform providing top quality products and services.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="/shop" color="inherit" underline="hover" display="block">
              Shop
            </Link>
            <Link href="/about" color="inherit" underline="hover" display="block">
              About Us
            </Link>
            <Link href="/contact" color="inherit" underline="hover" display="block">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: support@ecommerce.com
            </Typography>
            <Typography variant="body2">
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2">
              Address: 123 E-commerce St, Shopsville, USA
            </Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} E-commerce Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
