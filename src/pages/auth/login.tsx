
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


import { useContext, useEffect, useState } from 'react';
import { AuthLayout } from '../../components/layout';

import NextLink from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validators } from '../../common';

import { teslaAPI } from '../../api/';
import { ErrorOutlineOutlined } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { GetServerSideProps } from 'next';

type FormFields = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>();

  const [showError, setShowError] = useState(false);

  // const { handleLogin } = useContext(AuthContext);

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then(handledProviders => {
      setProviders(handledProviders);
    });
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async ({ email, password }) => {
    // const isAuthenticated = await handleLogin(email, password);
    // if (isAuthenticated) {
    //   const redirectionPath = decodeURIComponent(
    //     router.query.p?.toString() || '%252F'
    //   );
    //   router.replace(redirectionPath);

    //   return;
    // }

    const result = await signIn('credentials', { email, password });

    setShowError(true);
  };


  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ padding: '10px 20px', width: '350px' }}
          display="flex"
          justifyContent="center"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Iniciar Sesión
              </Typography>
              {showError && (
                <Chip
                  label="Revisá tú correo y/o contraseña"
                  color="error"
                  icon={<ErrorOutlineOutlined />}
                  variant="outlined"
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="outlined"
                type="email"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                helperText={errors.password && errors.password.message}
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
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <NextLink
                href={'/auth/register?p=' + router.query.p?.toString() || '/'}
                passHref
              >
                <Link underline="hover">¿No tenés una cuenta?</Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Divider sx={{ width: '100%', mb: 2 }} />

              {Object.values(providers).map((provider: any) => {

                if(provider.id === 'credentials') return (<></>)

                return (
                  <Button
                    key={provider.id}
                    variant="contained"
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                    sx={{mb: 1}}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

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

export default LoginPage;
