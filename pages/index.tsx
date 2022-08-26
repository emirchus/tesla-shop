import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/products';
import { Loading } from '../components/ui';
import { useProducts } from '../hooks';
import { Product } from '../interfaces';

const Home: NextPage = () => {
  const { products, isLoading } = useProducts();

  return (
    <ShopLayout
      title="Teslo Shop | Home"
      description="La mejor ropa del elon musk 😎"
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography
        variant="h2"
        sx={{
          marginBottom: '1rem'
        }}
      >
        La mejor ropa del elon musk 😎
      </Typography>

      {isLoading && <Loading />}
      {!isLoading && products && <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
