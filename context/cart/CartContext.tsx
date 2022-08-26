import { createContext } from 'react';
import { CartProduct } from '../../interfaces';

export interface SummaryProps {
  subTotal: number;
  total?: number;
  shipping?: number;
  taxes?: number;
}

interface CartContextProps {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  updateCart: (index: number, quantity: number) => void;
  removeProduct: (index: number) => void;
  orderSummary: SummaryProps;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);
