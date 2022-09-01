import Grid from '@mui/material/Grid';
import React, { FC, PropsWithChildren } from 'react';
import { Product } from '../../interfaces';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product, index) => {
        return <ProductCard product={product} key={index} />;
      })}
    </Grid>
  );
};
