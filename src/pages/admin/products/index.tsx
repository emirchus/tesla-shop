import { AddOutlined, CategoryTwoTone } from '@mui/icons-material';
import React from 'react';
import { AdminLayout } from '../../../components/layout';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import useSWR from 'swr';
import { Product } from '../../../interfaces';

import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
const ProductsPage = () => {
  const { data, error } = useSWR<Product[]>('/api/admin/products');

  const columns: GridColDef[] = [
    {
      field: 'img',
      headerName: 'Foto',
      align: 'center',
      renderCell(params) {
        return (
          <NextLink href={`/products/${params.row.slug}`}>
            <CardMedia component="img" src={`/products/${params.row.img}`} />
          </NextLink>
        );
      }
    },
    {
      field: 'title',
      headerName: 'Titulo',
      width: 200,
      renderCell(params) {
        return (
          <NextLink href={`/admin/products/${params.row.slug}`}>
            <Link underline="always">{params.row.title}</Link>
          </NextLink>
        );
      }
    },
    {
      field: 'gender',
      headerName: 'Género',
      width: 100
    },
    {
      field: 'type',
      headerName: 'Tipo',
      width: 100
    },
    {
      field: 'inStock',
      headerName: 'Inventario',
      width: 100
    },
    {
      field: 'price',
      headerName: 'Precio',
      width: 100
    },
    {
      field: 'sizes',
      headerName: 'Tallas',
      width: 100
    }
  ];

  const rows = (data ?? []).map((product, index) => ({
    id: product._id,
    ...product,
    img: product.images[0],
    sizes: product.sizes.join(', ')
  }));

  console.log(data);

  return (
    <AdminLayout
      title={`Productos (${data?.length ?? 0})`}
      icon={<CategoryTwoTone />}
      description="Dashboard de productos"
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined/>} href="/admin/products/new">Crear Producto</Button>
      </Box>
      {data && (
        <Grid
          container
          sx={{
            my: 2,
            height: 'calc(100vh - 200px)'
          }}
          className="fadeIn"
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
      )}
    </AdminLayout>
  );
};

export default ProductsPage;
