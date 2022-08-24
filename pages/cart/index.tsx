import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';

function CartPage() {
  return (
    <ShopLayout
      title="(3) Carrito | Tesla Shop"
      description="Carrito de compras de tesla shop"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList editable={true} />
        </Grid>
        <Grid item xs={12} sm={5} display="flex" justifyContent="end">
          <Card className="summary-card">
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                Orden
              </Typography>
              <OrderSummary total={40} />
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
