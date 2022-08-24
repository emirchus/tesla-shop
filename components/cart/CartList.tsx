import { FC } from 'react';
import { CartProduct } from '.';
import { initialData } from '../../database/products';

const productsSummary = [
  initialData.products[0],
  initialData.products[5],
  initialData.products[2]
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsSummary.map(product => (
        <CartProduct
          key={product.slug}
          product={product as any}
          editable={editable}
        />
      ))}
    </>
  );
};
