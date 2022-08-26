import { Box, Typography } from '@mui/material';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ShopLayout } from '../../components/layout';
import { NoProductsFound, ProductList } from '../../components/products';
import { searchProducts } from '../../database';
import { Product } from '../../interfaces';

interface Props {
  products: Product[];
  notFound: boolean;
}

const SearchQuery: NextPage<Props> = ({ products, notFound }) => {
  const router = useRouter();

  return (
    <ShopLayout
      title={`Teslo Shop | ${router.query.query}`}
      description="La mejor ropa del elon musk 😎"
    >
      <Box display="flex" sx={{ my: 4 }}>
        <Typography variant="h2" component="h1">
          Resultados para
        </Typography>
        <Typography variant="h2" fontWeight="bold" textTransform="capitalize" sx={{ ml: 1 }}>
          {router.query.query}
        </Typography>
      </Box>
      {notFound ? (
        <NoProductsFound products={products} />
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.trim().length === 0) {
    return {
      notFound: true
    };
  }

  let products = await searchProducts(query);
  let notFound = products.length === 0;

  const randomTerms = [
    'men',
    'kid',
    'women',
    'unisex',
    'cybertruck',
    '3d',
    'crew',
    'wordmark'
  ];

  const randomIndex = Math.floor(Math.random() * randomTerms.length + 1);

  const randomTerm = randomTerms[randomIndex];
  console.log(randomIndex, randomTerm);
  if (products.length === 0) {
    products = await searchProducts(randomTerm);
  }

  return {
    props: {
      products,
      notFound
    }
  };
};

export default SearchQuery;
