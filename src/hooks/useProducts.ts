import useSWR, { SWRConfiguration } from 'swr';
import { Product } from '../interfaces';

interface ProductsQuery {
  gender: 'all' | 'men' | 'women' | 'kid' | 'unisex';
}

export const useProducts = ({
  querys = { gender: 'all' },
  config = {}
}: {
  querys?: ProductsQuery;
  config?: SWRConfiguration;
} = {}) => {
  const { data, error } = useSWR<Product[]>(
    `/api/products?gender=${querys.gender}`,
    config
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error
  };
};
