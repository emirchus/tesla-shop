import { Add, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  quantity: number;
  onChange: (quantity: number) => void;
  maxQuantity: number;
}

export const ItemCounter: FC<Props> = ({ maxQuantity, onChange, quantity }) => {
  const handleChange = (handledQuantity: number) => {
    if (handledQuantity < 1) {
      onChange(1);
    } else if (handledQuantity >= maxQuantity) {
      onChange(maxQuantity);
    } else {
      onChange(handledQuantity);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => handleChange(--quantity)}>
        <Remove />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>
      <IconButton onClick={() => handleChange(++quantity)}>
        <Add />
      </IconButton>
    </Box>
  );
};
