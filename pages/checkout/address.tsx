import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { ShopLayout } from '../../components/layout';
import { BackButton } from '../../components/ui';

const AddessPage = () => {
  return (
    <ShopLayout
      title="Checkout | Tesla Shop"
      description="Confirmación de direción del destino"
    >
      <BackButton />
      <Box
        sx={{
          padding: 4
        }}
      >
        <Typography variant="subtitle2">Paso 1 de 2</Typography>
        <Typography variant="h1" component="h1">
          Envio
        </Typography>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nombre" fullWidth variant="outlined"></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              fullWidth
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              fullWidth
              variant="outlined"
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Dirección 2 (opcional)"
              variant="outlined"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Código Postal"
              fullWidth
              variant="outlined"
            ></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="Ciudad" fullWidth variant="outlined"></TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                sx={{ borderRadius: '14px' }}
                variant="outlined"
                label="País"
                value={1}
              >
                <option value={1}>Argentina</option>
                <option value={2}>Brasil</option>
                <option value={3}>Chile</option>
                <option value={4}>Uruguay</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              fullWidth
              variant="outlined"
            ></TextField>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display="flex" justifyContent="end">
          <Link href="/checkout/summary" passHref>
            <Button className="circular-btn" color="secondary" size="large">
              <Typography>Continuar</Typography>
            </Button>
          </Link>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default AddessPage;
