import { ChevronLeft } from '@mui/icons-material';

import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import React from 'react';

export const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleClick}
      startIcon={<ChevronLeft />}
      variant="text"
      color="primary"
    >
      Volver
    </Button>
  );
};
