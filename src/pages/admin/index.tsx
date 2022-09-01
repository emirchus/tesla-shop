import {
  AccessTimeTwoTone,
  AlarmTwoTone,
  CancelPresentationTwoTone,
  CategoryTwoTone,
  DashboardTwoTone,
  GroupTwoTone,
  PaidTwoTone,
  ProductionQuantityLimitsTwoTone,
  ReceiptTwoTone
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { SummaryCard } from '../../components/admin';
import { AdminLayout } from '../../components/layout';
import { Loading } from '../../components/ui';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {
  const { data, mutate, error } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      setRefreshIn(refreshIn => (refreshIn > 0 ? refreshIn - 1 : 30));
      if (refreshIn === 0) mutate();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data, mutate, refreshIn]);

  if (!error && !data) {
    return <Loading />;
  }

  const {
    orders,
    ordersPayed,
    withouPayOrders,
    clients,
    products,
    productsWithoutStock,
    productsWithBreak
  } = data!;

  return (
    <AdminLayout
      title="Dashboard"
      description="Estadisticas generales"
      icon={<DashboardTwoTone />}
    >
      {data && (
        <Grid container spacing={2}>
          <SummaryCard
            title={orders}
            description="Ordenes totales"
            icon={<ReceiptTwoTone color="secondary" sx={{ fontSize: 40 }} />}
          />
          <SummaryCard
            title={ordersPayed}
            description="Ordenes pagadas"
            icon={<PaidTwoTone color="success" sx={{ fontSize: 40 }} />}
          />
          <SummaryCard
            title={withouPayOrders}
            description="Ordenes pendientes"
            icon={<AccessTimeTwoTone color="error" sx={{ fontSize: 40 }} />}
          />
          <SummaryCard
            title={clients}
            description="Clientes"
            icon={<GroupTwoTone color="primary" sx={{ fontSize: 40 }} />}
          />
          <SummaryCard
            title={products}
            description="Productos"
            icon={<CategoryTwoTone color="primary" sx={{ fontSize: 40 }} />}
          />
          <SummaryCard
            title={productsWithoutStock}
            description="Sin Stock"
            icon={
              <CancelPresentationTwoTone
                color="primary"
                sx={{ fontSize: 40 }}
              />
            }
          />
          <SummaryCard
            title={productsWithBreak}
            description="Posible Quiebre"
            icon={
              <ProductionQuantityLimitsTwoTone
                color="primary"
                sx={{ fontSize: 40 }}
              />
            }
          />
          <SummaryCard
            title={refreshIn}
            description="Actualización en"
            icon={<AlarmTwoTone color="primary" sx={{ fontSize: 40 }} />}
          />
        </Grid>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
