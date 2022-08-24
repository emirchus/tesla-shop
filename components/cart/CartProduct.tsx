import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Product } from '../../interfaces';
import { ItemCounter } from '../products';

interface Props {
  product: Product;
  editable?: boolean;
}
export const CartProduct: FC<Props> = ({ product, editable }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={2}>
        <CardMedia
          image={`/products/${product.images[0]}`}
          component="img"
          sx={{ borderRadius: '15px', objectFit: 'cover' }}
          height={100}
          width={100}
        />
      </Grid>
      <Grid item xs={8}>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body2">Talla: {product.sizes[0]}</Typography>

          {editable ? (
            <ItemCounter />
          ) : (
            <Typography variant="body2">Cantidad: 3</Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">${product.price}</Typography>
        {editable && (
          <Button variant="text">
            <Typography variant="body2" color="secondary">
              Eliminar
            </Typography>
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
