import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Paper elevation={3} sx={{ padding: '20px', marginTop: '100px' }}>
        <Typography variant="h3" gutterBottom>Bienvenido a BancaDigital+</Typography>
      </Paper> */}
      <Box mt={2}>
        <img
          src="https://www.chn.com.gt/wp-content/uploads/2023/08/BANNER-PHISHING_1.png"
          style={{ maxWidth: '100%' }} // Ajusta el tamaño de la imagen
        />
      </Box>
    </Box>
  );
}

export default Home;
