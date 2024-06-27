import React from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,

} from '@mui/material';
// import { Send } from '@mui/icons-material';
const Contact: React.FC = () => {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            We'd love to hear from you! Please fill out the form below and we'll get in touch with you as soon as possible.
          </Typography>
          <Box component="form" sx={{ marginTop: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                //   endIcon={<Send />}
                  fullWidth
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default Contact;