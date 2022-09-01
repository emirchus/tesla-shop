import { InfoOutlined } from '@mui/icons-material';

import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

import Fade from '@mui/material/Fade';

import React, { FC } from 'react';

interface Props {
  subTotal?: number;
  shipping?: number;
  tax?: number;
  total: number;
}

export const OrderSummary: FC<Props> = ({ total, shipping, subTotal, tax }) => {
  return (
    <Grid container>
      {subTotal && (
        <>
          <Grid item xs={6}>
            <Typography>SubTotal</Typography>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <Typography variant="caption">${subTotal}</Typography>
          </Grid>
        </>
      )}
      <Grid item xs={6}>
        <Typography>Envio</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="caption">
          {shipping != undefined
            ? shipping == 0
              ? 'Gratis'
              : `$${shipping}`
            : 'Calculado en Checkout'}
        </Typography>
      </Grid>

      <Grid item xs={6} flexDirection="row" display="flex" alignItems="center">
        <Typography>Impuestos</Typography>
        {!tax && (
          <Tooltip
            title="Los impuestos son calculados con la dirección de envio en el checkout"
            placement="top"
            disableInteractive
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <InfoOutlined sx={{ ml: 1 }} fontSize="small" />
          </Tooltip>
        )}
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="caption">
          {tax ? `$${tax}` : 'Calculado en Checkout'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">${total}</Typography>
      </Grid>
    </Grid>
  );
};
