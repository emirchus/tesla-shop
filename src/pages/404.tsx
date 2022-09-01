
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';

import Box from '@mui/material/Box';

import NextLink from 'next/link';
import { ShopLayout } from '../components/layout';

const ErrorPage = () => {
  return (
    <ShopLayout title="Tesla Shop | Ooops..." description="Page not found">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row'
          }
        }}
      >
        <Typography variant="h1" component="h1" fontSize={100} fontWeight={200}>
          404
        </Typography>
        <Box
          sx={{
            borderLeft: {
              xs: 'none',
              sm: '2px solid'
            },
            pl: {
              xs: '0',
              sm: 3
            },
            ml: {
              xs: '0',
              sm: 3
            },

            borderTop: {
              sm: 'none',
              xs: '2px solid'
            },
            pt: {
              sm: '0',
              xs: 3
            },
            mt: {
              sm: '0',
              xs: 3
            }
          }}
        >
          <Typography variant="h2">
            Uy... parece que la página que buscas no existe.
          </Typography>

          <Typography variant="h2" fontWeight={200}>
            Puedes volver haciendo click acá{' '}
            <NextLink href="/" passHref>
              <Link underline="hover">volver</Link>
            </NextLink>
          </Typography>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default ErrorPage;
