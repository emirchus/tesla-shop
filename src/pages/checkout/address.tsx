import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Link from 'next/link';
import React, { useContext } from 'react';
import { ShopLayout } from '../../components/layout';
import { BackButton } from '../../components/ui';
import { countries } from '../../common';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

type FormFields = {
  name: string;
  lastName: string;
  address: string;
  secondaryAddress?: string;
  cp: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormFields => {
  return {
    name: Cookies.get('name') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    secondaryAddress: Cookies.get('secondaryAddress') || '',
    cp: Cookies.get('cp') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || 'ARG',
    phone: Cookies.get('phone') || ''
  };
};
const AddessPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>({
    defaultValues: getAddressFromCookies()
  });

  const router = useRouter();

  const { setShippingInformation } = useContext(CartContext);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    setShippingInformation(data);
    return router.push('/checkout/summary');
  };

  return (
    <ShopLayout
      title="Checkout | Tesla Shop"
      description="Confirmación de direción del destino"
    >
      <BackButton />
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <TextField
                label="Nombre"
                fullWidth
                variant="outlined"
                {...register('name', {
                  required: 'El nombre es requerido'
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                fullWidth
                variant="outlined"
                {...register('lastName', {
                  required: 'El apellido es requerido'
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                fullWidth
                variant="outlined"
                {...register('address', {
                  required: 'La dirección es requerido'
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección 2 (opcional)"
                variant="outlined"
                {...register('secondaryAddress')}
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Código Postal"
                fullWidth
                variant="outlined"
                {...register('cp', {
                  required: 'El código postal es requerido',
                  valueAsNumber: true
                })}
                error={!!errors.cp}
                helperText={errors.cp?.message}
                type="number"
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Ciudad"
                fullWidth
                variant="outlined"
                {...register('city', {
                  required: 'La ciudad es requerido'
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  sx={{ borderRadius: '14px' }}
                  variant="outlined"
                  label="País"
                  defaultValue="ARG"
                  {...register('country', {
                    required: 'El pais es requerido'
                  })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                >
                  {countries.map((country, index) => (
                    <MenuItem key={index} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                fullWidth
                type="tel"
                variant="outlined"
                {...register('phone', {
                  required: 'El número de teléfono es requerido',
                  valueAsNumber: true
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 5 }} display="flex" justifyContent="end">
            <Button
              className="circular-btn"
              color="secondary"
              size="large"
              type="submit"
            >
              <Typography>Continuar</Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </ShopLayout>
  );
};
export default AddessPage;
