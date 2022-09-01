
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import NextLink from 'next/link';
import React, { FC } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Product } from '../../interfaces';
import { ProductList } from './';

interface Props {
  products: Product[];
}

export const NoProductsFound: FC<Props> = ({ products }) => {
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'row'
          }
        }}
      >
        <ProductionQuantityLimitsIcon sx={{ fontSize: 120 }} />
        <Box
          sx={{
            pl: {
              xs: '0',
              sm: 3
            },
            ml: {
              xs: '0',
              sm: 3
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
            Uy... parece que no encontramos productos
            <br />
            con ese término.
          </Typography>

          <Typography variant="h2" fontWeight={200}>
            Intenta con otro término
          </Typography>
        </Box>
      </Box>
      <ProductList products={products}></ProductList>
    </Box>
  );
};
