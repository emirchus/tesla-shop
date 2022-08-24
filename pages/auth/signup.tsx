import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { AuthLayout } from '../../components/layout';

import NextLink from 'next/link';

const SignUpPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Crear cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Nombre" variant="outlined" fullWidth />
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
              Crear Cuenta
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body2" component="p" sx={{ mr: 1 }}>
              ¿Ya tenés una cuenta?
            </Typography>{' '}
            <NextLink href={'/auth/signup'} passHref>
              <Link underline="hover">
                <Typography fontWeight={500} variant="body2" component="p">
                  Iniciar Sesión
                </Typography>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default SignUpPage;
