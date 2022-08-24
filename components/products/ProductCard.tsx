import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Grid,
  Link,
  Typography
} from '@mui/material';

import NextLink from 'next/link';
import React, { FC, useMemo, useState } from 'react';
import { Product } from '../../interfaces';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const productImage = useMemo(() => {
    return isHover
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHover, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card>
        <CardActionArea>
          <NextLink href={`/products/${product.slug}`} passHref prefetch={false}>
            <Link>
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
              />
            </Link>
          </NextLink>
        </CardActionArea>
      </Card>
      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
