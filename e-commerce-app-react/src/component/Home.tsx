/**
 * Home Component
 * @returns 
 */

import { Box, Button, Container, Paper, Typography } from "@mui/material";

const Home:React.FC=()=>{
   return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/student/1600x900)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h2" gutterBottom>
            Welcome to E-commerce Platform
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/products"
            sx={{ marginTop: 2 }}
          >
            Let's Shop
          </Button>
        </Paper>
      </Container>
    </Box>
   )
}

export default Home;