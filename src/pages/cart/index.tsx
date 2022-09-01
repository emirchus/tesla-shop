
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { CartContext } from '../../context';

function CartPage() {
  const { cart, isLoaded } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <ShopLayout
      title={`(${cart.reduce(
        (prev, curr) => prev + curr.quantity,
        0
      )}) Carrito | Tesla Shop`}
      description="Carrito de compras de tesla shop"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList productsSummary={cart} editable={true} />
        </Grid>
        <Grid item xs={12} sm={5} display="flex" justifyContent="end">
          <Card className="summary-card">
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                Orden
              </Typography>
              <OrderSummary
                total={cart.reduce(
                  (prev, curr) => prev + curr.price * curr.quantity,
                  0
                )}
              />
              <Box sx={{ mt: 3 }}>
                <Link href="/checkout/address" passHref>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Checkout
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default CartPage;
