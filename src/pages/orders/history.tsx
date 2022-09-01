import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { ShopLayout } from '../../components/layout';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined
} from '@mui/icons-material';
import NextLink from 'next/link';

import { GetServerSideProps, NextPage } from 'next';
import { Order } from '../../interfaces';
import { getSession } from 'next-auth/react';
import { getOrdersByUserId } from '../../database';

import dayjs from "dayjs";

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    align: 'center'
  },
  {
    field: 'fullname',
    headerName: 'Nombre',
    width: 100
  },
  {
    field: 'paid',
    headerName: 'Estado',
    description: 'Información del estado del producto',
    width: 200,
    renderCell(params) {
      return !params.row.paid ? (
        <Chip
          sx={{ my: 2 }}
          label="Esperando a pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pago confirmado"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      );
    }
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de creación',
    width: 200,
    renderCell(params) {
      return <Typography>
        {dayjs(params.row.createdAt).format("DD/MM/YYYY hh:mm A")}
      </Typography>
    }
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 100,
    renderCell(params) {
      return <Typography>
        ${params.row.total}
      </Typography>
    }
  },
  {
    field: 'orden',
    headerName: 'Orden',
    width: 100,
    sortable: false,
    editable: false,
    renderCell(params) {
      return (
        <NextLink href={`/orders/${params.row._id}`}>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    }
  }
];

interface OrderRow {
  id: string;
  paid: string;
  fullname: string;
}

interface HistoryProps {
  orders: Required<Order>[];
}

const HistoryPage: NextPage<HistoryProps> = ({ orders }) => {
  const rows = useMemo(() => {
    return orders.map((order, index) => {
      return {
        fullname:
          order.shippingAddress.name + ' ' + order.shippingAddress.lastName,
        id: index,
        paid: order.isPaid,
        ...order
      };
    });
  }, [orders]);

  return (
    <ShopLayout
      title="Ordenes | Tesla Shop"
      description="Historial de ordenes de tesla shop"
    >
      <Box
        sx={{
          padding: 4
        }}
      >
        <Typography variant="h1" component="h1">
          Historial de ordenes
        </Typography>

        <Grid
          container
          sx={{
            my: 2,
            height: 'calc(100vh - 200px)'
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              height: '100%',
              width: '100%'
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            ></DataGrid>
          </Grid>
        </Grid>
      </Box>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false
      }
    };
  }

  const userId = (session.user as any)._id;

  const orders = await getOrdersByUserId(userId);

  return {
    props: {
      orders
    }
  };
};

export default HistoryPage;
