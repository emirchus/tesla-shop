import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { countries } from '../../common';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';
import { BackButton } from '../../components/ui';
import { CartContext } from '../../context';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

function SummaryPage() {
  const { cart, orderSummary, shippingInformation, createOrder } =
    useContext(CartContext);
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (!Cookies.get('name')) {
      router.push('/checkout/address');
    }
  }, [router]);

  const handleCreateOrder = async () => {
    setLoading(true);
    const { hasError, message } = await createOrder();
    setLoading(false);
    if (hasError) {
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

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

              <Typography fontWeight="medium">
                {shippingInformation?.name} {shippingInformation?.lastName}
              </Typography>
              <Typography fontWeight="medium">
                {shippingInformation?.address}
              </Typography>
              {shippingInformation?.secondaryAddress && (
                <Typography fontWeight="medium">
                  {shippingInformation?.secondaryAddress}
                </Typography>
              )}
              <Typography fontWeight="medium">
                {shippingInformation?.city}, {shippingInformation?.cp}
              </Typography>
              <Typography fontWeight="medium">
                {
                  countries.find(
                    country => country.code === shippingInformation?.country
                  )?.name
                }
              </Typography>
              <Typography fontWeight="medium">
                {shippingInformation?.phone}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <OrderSummary
                total={orderSummary.total || 0}
                shipping={orderSummary.shipping}
                subTotal={orderSummary.subTotal}
                tax={orderSummary.taxes}
              />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={handleCreateOrder}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="info" />
                  ) : (
                    'Confirmar Orden'
                  )}
                </Button>
                {errorMessage && (
                  <Chip
                    label={errorMessage}
                    variant="outlined"
                    color="error"
                    sx={{ width: '100%', my: 3 }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default SummaryPage;
