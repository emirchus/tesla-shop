import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { ShopLayout } from '../../components/layout';
import {
  ItemCounter,
  ProductSlideshow,
  SizeSelector
} from '../../components/products';
import { CartProduct, Product, ProductSize } from '../../interfaces';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllProductsSlugs, getProductBySlug } from '../../database';
import { handleClientScriptLoad } from 'next/script';
import { useContext } from 'react';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';
interface ProductProps {
  product: Product;
}

const ProductPage: FC<ProductProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    title: product.title,
    gender: product.gender,
    quantity: 1,
    inStock: product.inStock
  });

  const { addToCart, cart, updateCart } = useContext(CartContext);

  const router = useRouter();

  const handleAddToCart = () => {
    const hasProductInCart = cart.some(
      inCart => inCart._id === cartProduct._id
    );

    if (hasProductInCart) {
      const totalQuantityInCart = cart
        .filter(inCart => inCart._id === cartProduct._id)
        .reduce((prev, curr) => prev + curr.quantity, 0);

      if (
        totalQuantityInCart + cartProduct.quantity > product.inStock ||
        totalQuantityInCart === product.inStock
      )
        return;

      console.log(totalQuantityInCart + cartProduct.quantity);

      const productInCartIndex = cart.findIndex(
        productIn =>
          productIn._id === cartProduct._id &&
          productIn.size === cartProduct.size
      );

      if (productInCartIndex !== -1) {
        let productInCart = cart[productInCartIndex];
        productInCart.quantity += cartProduct.quantity;
        productInCart.quantity = Math.min(
          productInCart.quantity,
          product.inStock
        );

        return updateCart(productInCartIndex, productInCart.quantity);
      }
    }

    addToCart(cartProduct);
  };

  return (
    <ShopLayout
      title={`${product?.title} | Tesla Shop`}
      description={product?.description || 'Cargando...'}
      imageFullUrl={`${window.location.origin}/products/${product.images[0]}`}
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
                value={cartProduct.size}
                onChange={selectedSize =>
                  setCartProduct({
                    ...cartProduct,
                    size:
                      selectedSize === cartProduct.size
                        ? undefined
                        : selectedSize
                  })
                }
                sizes={product.sizes}
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                maxQuantity={product.inStock}
                onChange={(quantity: number) => {
                  console.log(quantity);

                  setCartProduct({
                    ...cartProduct,
                    quantity: quantity
                  });
                }}
                quantity={cartProduct.quantity}
              />
            </Box>
            {/* Agregar al carrito */}
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                disabled={!cartProduct.size}
                onClick={handleAddToCart}
              >
                {cartProduct.size
                  ? 'Agregar al carrito'
                  : 'Seleccione una talla'}
              </Button>
            ) : (
              <Chip label="Sin Stock" color="error" variant="outlined" />
            )}

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

export const getStaticPaths: GetStaticPaths = async ctx => {
  const slugs = await getAllProductsSlugs();

  return {
    paths: slugs.map(slug => ({
      params: { slug }
    })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ctx => {
  const slug = ctx.params!.slug as string;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  };
};

export default ProductPage;
