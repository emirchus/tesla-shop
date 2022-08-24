import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import { ShopLayout } from '../components/layout';
import { ProductList } from '../components/products';
import { initialData } from '../database/products';
import { Product } from '../interfaces';

const Home: NextPage = () => {
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

      <ProductList products={initialData.products as Product[]} />
    </ShopLayout>
  );
};

export default Home;
