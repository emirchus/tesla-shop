import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import React, { useContext, useEffect, useMemo } from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { BackButton } from '../../components/ui';
import { CartContext } from '../../context';

function SummaryPage() {
  const { cart, orderSummary } = useContext(CartContext);

  return (
    <ShopLayout
      title="Resúmen | Tesla Shop"
      description="Resúmen de la orden de tesla shop"
    >
      <BackButton />
      <Typography variant="h1" component="h1">
        Resúmen
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList productsSummary={cart} editable={false} />
        </Grid>
        <Grid item xs={12} sm={5} display="flex" justifyContent="end">
          <Card className="summary-card">
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                Resúmen de la orden (3)
              </Typography>

              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                sx={{ mb: 1, mt: 2 }}
              >
                <Typography variant="subtitle2">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address">
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography fontWeight="medium">Emir :v</Typography>
              <Typography fontWeight="medium">Calle viva 123</Typography>
              <Typography fontWeight="medium">Springfield, 123</Typography>
              <Typography fontWeight="medium">Estados Únidos</Typography>
              <Typography fontWeight="medium">+1 123 123 3333</Typography>

              <Divider sx={{ my: 2 }} />

              <OrderSummary
                total={orderSummary.total || 0}
                shipping={orderSummary.shipping}
                subTotal={orderSummary.subTotal}
                tax={orderSummary.taxes}
              />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default SummaryPage;
