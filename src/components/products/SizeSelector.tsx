import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FC } from 'react';
import { ProductSize } from '../../interfaces';

interface Props {
  value?: ProductSize;
  sizes: ProductSize[];
  onChange: (size: ProductSize) => void;
}

export const SizeSelector: FC<Props> = ({ sizes, value, onChange }) => {
  return (
    <Box>
      {sizes.map(size => (
        <Button
          key={size}
          size="small"
          sx={{
            textDecoration: size === value ? 'underline' : 'none'
          }}
          onClick={() => onChange(size)}
          variant="text"
          color="primary"
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
