import {
  CreditCardOffOutlined,
  CreditScoreOutlined
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layout';

function OrderPage() {
  const router = useRouter();

  const id = router.query.id as string;

  return (
    <ShopLayout
      title="Orden | Tesla Shop"
      description="Orden confirmada tesla shop"
    >
      <Typography variant="h1" component="h1">
        Orden: #{id}
      </Typography>

      <Chip
        sx={{ my: 2 }}
        label="Esperando a pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />

      <Chip
        sx={{ my: 2 }}
        label="Pago confirmado"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sm={7}>
          {/* <CartList editable={false} /> */}
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
                total={61.5}
                shipping={0}
                subTotal={41}
                tax={20.5}
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

export default OrderPage;
