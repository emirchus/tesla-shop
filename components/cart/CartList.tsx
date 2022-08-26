import { FC } from 'react';
import { CartProduct } from '.';
import { CartProduct as ICartProduct } from '../../interfaces';

interface Props {
  editable?: boolean;
  productsSummary: ICartProduct[];
}

export const CartList: FC<Props> = ({ editable = false, productsSummary }) => {
  return (
    <>
      {productsSummary.map((product, index) => (
        <CartProduct key={index} product={product} editable={editable} />
      ))}
    </>
  );
};
