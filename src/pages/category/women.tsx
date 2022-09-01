
import Typography from '@mui/material/Typography';
import React from 'react';
import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { Loading } from '../../components/ui';
import { useProducts } from '../../hooks';

const MenPage = () => {
  const { isLoading, products } = useProducts({
    querys: {
      gender: 'women'
    }
  });

  return (
    <ShopLayout
      title="Teslo Shop | Mujer"
      description="Esta ropita es para vos dama, hermosa, reina, princesa, damicela, que se merece la ropa más facherita, esto es para mi amor 😎"
      imageFullUrl="https://github.com/MrEmii/Wallpapers/blob/main/wallpapers/48.png?raw=true"
    >
      <Typography variant="h1" component="h1">
        Mujeres 👸
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
