
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import React, { useContext, useState } from 'react';
import { AuthLayout } from '../../components/layout';

import NextLink from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validators } from '../../common';
import { teslaAPI } from '../../api';
import { ErrorOutlineOutlined } from '@mui/icons-material';

import { AxiosError } from 'axios';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';

import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

type FormFields = {
  name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>();

  const [errorMessage, setErrorMessage] = useState<string | undefined | null>(
    null
  );

  const { handleRegister } = useContext(AuthContext);

  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async ({
    name,
    email,
    password
  }) => {
    const result = await handleRegister(name, email, password);

    if (result) {
      setErrorMessage(result);
      return;
    }

    await signIn('credentials', { email, password });
    const redirectionPath = router.query.p?.toString() || '/';
    return router.replace(redirectionPath);
  };

  return (
    <AuthLayout title="Crear cuenta">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Crear cuenta
              </Typography>
              {!!errorMessage && (
                <Chip
                  label={errorMessage}
                  color="error"
                  icon={<ErrorOutlineOutlined />}
                  variant="outlined"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido'
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="outlined"
                type="email"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validators.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido'
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Crear Cuenta
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body2" component="p" sx={{ mr: 1 }}>
                ¿Ya tenés una cuenta?
              </Typography>{' '}
              <NextLink
                href={'/auth/login?p=' + router.query.p?.toString() || '/'}
                passHref
              >
                <Link underline="hover">
                  <Typography fontWeight={500} variant="body2" component="p">
                    Iniciar Sesión
                  </Typography>
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession({ req: ctx.req });

  const { p = '/' } = ctx.query;

  const redirectTo = decodeURIComponent(p.toString());

  if (session) {
    return {
      redirect: {
        destination: redirectTo,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

export default SignUpPage;
