import {
  ConfirmationNumberTwoTone,
  CreditCardOffOutlined,
  CreditScoreOutlined
} from '@mui/icons-material';
import React from 'react';
import { AdminLayout } from '../../../components/layout';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import useSWR from 'swr';
import { Order, User } from '../../../interfaces';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

const OrdersPage = () => {
  const { data, error } = useSWR<Order[]>('/api/admin/orders');

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      align: 'center'
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 100
    },
    {
      field: 'email',
      headerName: 'Correo',
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
        return (
          <Typography>
            {dayjs(params.row.createdAt).format('DD/MM/YYYY hh:mm A')}
          </Typography>
        );
      }
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      renderCell(params) {
        return <Typography>${params.row.total}</Typography>;
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
          <NextLink href={`/admin/orders/${params.row._id}`}>
            <Link underline="always">Ver orden</Link>
          </NextLink>
        );
      }
    }
  ];

  const rows = (data ?? []).map((order, index) => ({
    id: index,
    ...order,
    name: (order.user as User).name,
    email: (order.user as User).email
  }));

  console.log(data);


  return (
    <AdminLayout
      title="Ordenes"
      icon={<ConfirmationNumberTwoTone />}
      description="Dashboard de ordenes"
    >
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
            rows={rows || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          ></DataGrid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
