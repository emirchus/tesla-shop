import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ShopLayout } from '../../components/layout';
import {
  ItemCounter,
  ProductSlideshow,
  SizeSelector
} from '../../components/products';
import { initialData } from '../../database/products';
import { ProductSize } from '../../interfaces';

const product = initialData.products[0];

const ProductPage = () => {
  const [size, setSize] = useState<ProductSize | undefined>();
  const [quantity, setQuantity] = useState(1);

  return (
    <ShopLayout
      title={`${product.title} | Tesla Shop`}
      description={product.description}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Titulo */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Tamaño</Typography>
              <SizeSelector
                value={size}
                onChange={selectedSize =>
                  setSize(selectedSize === size ? undefined : selectedSize)
                }
                sizes={product.sizes}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
            </Box>
            {/* Agregar al carrito */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>
            {/* <Chip label="No hay disponibles" color="error" variant="outline"></Chip> */}
            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;
