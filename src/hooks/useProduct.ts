import useSWR, { SWRConfiguration } from 'swr';
import { Product } from '../interfaces';

export const useProduct = (
  slug: string,
  {
    config = {}
  }: {
    config?: SWRConfiguration;
  } = {}
) => {
  const { data, error } = useSWR<Product>(`/api/products/${slug}`, config);

  return {
    product: data,
    isLoading: !error && !data,
    isError: error
  };
};
