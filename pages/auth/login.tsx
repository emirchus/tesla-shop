import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { AuthLayout } from '../../components/layout';

import NextLink from 'next/link';

const LoginPage = () => {
  return (
    <AuthLayout title="Iniciar sesión">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Iniciar Sesión
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Correo" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <NextLink href={'/auth/signup'} passHref>
              <Link underline="hover">¿No tenés una cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
