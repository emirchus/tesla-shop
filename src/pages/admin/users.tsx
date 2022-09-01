import { PeopleTwoTone } from '@mui/icons-material';
import React, { useEffect, useMemo, useState } from 'react';
import { AdminLayout } from '../../components/layout';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import useSWR from 'swr';
import { User } from '../../interfaces';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { teslaAPI } from '../../api';
type roles = 'client' | 'admin' | 'super-user' | 'SEO';
const UsersPage = () => {
  const { data, error } = useSWR<User[]>('/api/admin/users');

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const onRoleChange = async (id: string, role: roles) => {
    try {
      await teslaAPI.put('/admin/users/' + id, { role });
      setUsers(prev => {
        const index = prev.findIndex(u => u._id === id);
        prev[index].role = role;
        return [...prev];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 200,
      renderCell({ row }: GridValueGetterParams) {
        return (
          <Select
            onChange={value => onRoleChange(row.id, value.target.value)}
            value={row.role}
            label="Rol"
            sx={{ width: '300px' }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Cliente</MenuItem>
            <MenuItem value="super-user">Super Usuario</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        );
      }
    }
  ];

  const rows = useMemo(
    () =>
      users.map(user => ({
        id: user._id,
        ...user
      })),
    [users]
  );

  return (
    <AdminLayout
      title="Usuarios"
      icon={<PeopleTwoTone />}
      description="Dashboard de usuarios"
    >
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
    </AdminLayout>
  );
};

export default UsersPage;
