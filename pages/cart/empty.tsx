import { RemoveShoppingCartTwoTone } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { ShopLayout } from '../../components/layout';

function EmptyCardPage() {
  return (
    <ShopLayout
      title="Tesla Shop"
      description="Sin productos en el carrito de compras."
    >
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
          <RemoveShoppingCartTwoTone sx={{ fontSize: 140 }} />
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
              Pero... no hay nada en el carrito de compras.
            </Typography>

            <Typography variant="h2" fontWeight={200}>
              Primero añadi productos al carrito!{' '}
              <NextLink href="/" passHref>
                <Link underline="hover">COMPRAR</Link>
              </NextLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ShopLayout>
  );
}

export default EmptyCardPage;
