
import Typography from '@mui/material/Typography';

import React from 'react';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';
import { useProducts } from '../../hooks';

const KidsPage = () => {
  const { isLoading, products } = useProducts({
    querys: {
      gender: 'kid'
    }
  });

  return (
    <ShopLayout
      title="Teslo Shop | Niños"
      description="Ropa para tu bebé, tu hijo, tu hermanito, tu primito, y toda tu familia menor a 4 años 😎"
      imageFullUrl="https://github.com/MrEmii/Wallpapers/blob/main/wallpapers/47.png?raw=true"
    >
      <Typography variant="h1" component="h1">
        Niños 👶
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

export default KidsPage;
