
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


import NextLink from 'next/link';
import React, { FC, useMemo, useState } from 'react';
import { Product } from '../../interfaces';

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHover, setIsHover] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const productImage = useMemo(() => {
    return isHover
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHover, product.images]);

  const handleImageLoading = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    setIsLoaded(true);
  };

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
          {product.inStock === 0 && (
            <Chip
              color="primary"
              label="Sin Stock"
              sx={{ position: 'absolute', zIndex: 99, top: 10, left: 10 }}
            />
          )}
          <NextLink
            href={`/products/${product.slug}`}
            passHref
            prefetch={false}
          >
            <Link>
              <CardMedia
                component="img"
                image={productImage}
                alt={product.title}
                onLoad={handleImageLoading}
              />
            </Link>
          </NextLink>
        </CardActionArea>
      </Card>
      <Box
        sx={{ mt: 1, display: isLoaded ? 'block' : 'none' }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  );
};
