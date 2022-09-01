import { createContext } from 'react';
import { CartProduct, ShippingInformation } from '../../interfaces';

export interface SummaryProps {
  subTotal: number;
  total?: number;
  shipping?: number;
  taxes?: number;
}

interface CartContextProps {
  cart: CartProduct[];
  isLoaded: boolean;
  addToCart: (product: CartProduct) => void;
  updateCart: (index: number, quantity: number) => void;
  removeProduct: (index: number) => void;
  orderSummary: SummaryProps;
  shippingInformation?: ShippingInformation;
  setShippingInformation: (shippingInformation: ShippingInformation) => void;

  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);
