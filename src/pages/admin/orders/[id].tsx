import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
  ErrorOutlineOutlined
} from '@mui/icons-material';
import React, { useState } from 'react';
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../../components/layout';
import { CartList, OrderSummary } from '../../../components/cart';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { getOrderById } from '../../../database';
import { CartProduct, Order } from '../../../interfaces';
import { countries } from '../../../common';
import CircularProgress from '@mui/material/CircularProgress';

export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'COMPLETED'
    | 'PAYER_ACTION_REQUIRED';
};

interface OrderPageProps {
  order: Required<Order>;
}

const OrderPage: NextPage<OrderPageProps> = ({ order }) => {
  return (
    <ShopLayout
      title="Orden | Tesla Shop"
      description="Orden confirmada tesla shop"
    >
      <Typography variant="h1" component="h1">
        Orden: #{order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Pago confirmado"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Esperando a pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList
            editable={false}
            productsSummary={order.orderItems as CartProduct[]}
          />
        </Grid>
        <Grid item xs={12} sm={5} display="flex" justifyContent="end">
          <Card className="summary-card">
            <CardContent>
              <Typography variant="subtitle1" component="h2">
                Resúmen de la orden (
                {order.orderItems.reduce(
                  (prev, curr) => prev + curr.quantity,
                  0
                )}
                )
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
              </Box>

              <Typography fontWeight="medium">
                {order.shippingAddress?.name} {order.shippingAddress?.lastName}
              </Typography>
              <Typography fontWeight="medium">
                {order.shippingAddress?.address}
              </Typography>
              {order.shippingAddress?.secondaryAddress && (
                <Typography fontWeight="medium">
                  {order.shippingAddress?.secondaryAddress}
                </Typography>
              )}
              <Typography fontWeight="medium">
                {order.shippingAddress?.city}, {order.shippingAddress?.cp}
              </Typography>
              <Typography fontWeight="medium">
                {
                  countries.find(
                    country => country.code === order.shippingAddress?.country
                  )?.name
                }
              </Typography>
              <Typography fontWeight="medium">
                {order.shippingAddress?.phone}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <OrderSummary
                total={order.total}
                shipping={order.shipping}
                subTotal={order.subTotal}
                tax={order.taxes}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const { id = '' } = query;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false
      }
    };
  }

  const order = await getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false
      }
    };
  }

  return {
    props: {
      order
    }
  };
};

export default OrderPage;
