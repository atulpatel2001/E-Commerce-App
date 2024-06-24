/**
 * Footer Component
 */

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ p: 2, mt: 'auto', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
      <Typography variant="body1">&copy; 2024 E-commerce Silver Touch Site Site. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
