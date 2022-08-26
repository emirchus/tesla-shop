import { Box, Button, CardMedia, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useContext, useMemo } from 'react';
import { CartContext } from '../../context';
import { CartProduct as ICartProduct, Product } from '../../interfaces';
import { ItemCounter } from '../products';

interface Props {
  product: ICartProduct;
  editable?: boolean;
}
export const CartProduct: FC<Props> = ({ product, editable }) => {
  const { cart, updateCart, removeProduct } = useContext(CartContext);
  const router = useRouter();


  const handleChangeQuantity = (quantity: number) => {
    const index = cart.findIndex(
      productIn =>
        productIn._id === product._id && productIn.size === product.size
    );


    if (quantity < product.quantity) {
      return updateCart(index, quantity);
    }

    const totalQuantityInCart = cart
      .filter(
        inProduct =>
          inProduct._id === product._id && inProduct.size != product.size
      )
      .reduce((prev, curr) => prev + curr.quantity, 0);

    if (
      totalQuantityInCart + product.quantity > product.inStock ||
      totalQuantityInCart === product.inStock
    )
      return;

    return updateCart(index, Math.min(quantity, product.inStock));
  };

  const handleRemove = () => {
    const index = cart.findIndex(
      item => item._id === product._id && item.size === product.size
    );
    if (index !== -1) {
      removeProduct(index);

      if (cart.length === 0) {
        router.push('/');
      }
    }
  };

  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={2}>
        <CardMedia
          image={`/products/${product.image}`}
          component="img"
          sx={{ borderRadius: '15px', objectFit: 'cover' }}
          height={100}
          width={100}
        />
      </Grid>
      <Grid item xs={8}>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body2">Talla: {product.size}</Typography>

          {editable ? (
            <ItemCounter
              maxQuantity={product.inStock}
              onChange={handleChangeQuantity}
              quantity={product.quantity}
            />
          ) : (
            <Typography variant="body2">
              Cantidad: {product.quantity}
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1">${product.price}</Typography>
        {editable && (
          <Button variant="text" onClick={handleRemove}>
            <Typography variant="body2" color="secondary">
              Eliminar
            </Typography>
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
