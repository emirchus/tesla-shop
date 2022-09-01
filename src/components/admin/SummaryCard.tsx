import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
  title: string | number;
  description: string;
  icon: JSX.Element;
}

export const SummaryCard: FC<Props> = ({ description, icon, title }) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card sx={{ display: 'flex' }}>
        <CardContent
          sx={{
            width: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {icon}
        </CardContent>
        <CardContent
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h3">{title}</Typography>
          <Typography variant="caption">{description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
