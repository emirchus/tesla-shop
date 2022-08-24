import {
  Link,
  Box,
  Chip,
  Grid,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layout';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
  LinkTwoTone
} from '@mui/icons-material';
import NextLink from 'next/link';

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
    width: 300
  },
  {
    field: 'paid',
    headerName: 'Estado',
    description: 'Información del estado del producto',
    width: 300,
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
    field: 'orden',
    headerName: 'Orden',
    width: 100,
    sortable: false,
    editable: false,

    renderCell(params) {
      return (
        <NextLink href={`/orders/${params.row.id}`}>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    }
  }
];

const rows = [
  { id: 1, paid: false, fullname: 'John Doe' },
  { id: 2, paid: true, fullname: 'Emir Ali' },
  { id: 3, paid: false, fullname: 'Tony Stark' },
  { id: 4, paid: true, fullname: 'Julio Perez' },
  { id: 5, paid: true, fullname: 'MAradona' },
  { id: 6, paid: false, fullname: 'Mara' },
  { id: 7, paid: false, fullname: 'Dona' }
];

function HistoryPage() {
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
}

export default HistoryPage;
