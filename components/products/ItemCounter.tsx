import { Add, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {}

export const ItemCounter: FC<Props> = () => {
  return (
    <Box display="flex" alignItems="center">
      <IconButton>
        <Remove />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
      <IconButton>
        <Add />
      </IconButton>
    </Box>
  );
};
