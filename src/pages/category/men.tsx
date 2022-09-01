
import Typography from '@mui/material/Typography';

import React from 'react';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';
import { useProducts } from '../../hooks';

const MenPage = () => {
  const { isLoading, products } = useProducts({
    querys: {
      gender: 'men'
    }
  });

  return (
    <ShopLayout
      title="Teslo Shop | Hombre"
      description="Para el caballero, aquel que da todo por su familia y se hace respetar... tesla te da tu ropita pa 😎"
      imageFullUrl="https://github.com/MrEmii/Wallpapers/blob/main/wallpapers/24.png?raw=true"
    >
      <Typography variant="h1" component="h1">
        Hombres 🤴
      </Typography>
      <Typography
        variant="h2"
        sx={{
          marginBottom: '1rem'
        }}
      >
        Más Vendidos
      </Typography>

      {isLoading && <Loading />}
      {!isLoading && products && <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
