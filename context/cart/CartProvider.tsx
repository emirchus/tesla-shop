import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { CartProduct } from '../../interfaces';
import { CartContext, cartReducer, SummaryProps } from './';
import Cookies from 'js-cookie';
export interface CartState {
  cart: CartProduct[];
  orderSummary: SummaryProps;
}

const Cart_InitialState: CartState = {
  cart: [],
  orderSummary: {
    subTotal: 0
  }
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_InitialState);

  useEffect(() => {
    const cart = Cookies.get('cart');
    if (cart) {
      dispatch({ type: 'set', payload: JSON.parse(cart) });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookies.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const subTotal = state.cart.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );

    const TAXES = Number(process.env.NEXT_PUBLIC_TAX || 0);

    const shipping = subTotal <= 1200 ? 120 : 0;

    const total = subTotal * (1 + TAXES) + shipping;
    const orderSummary = {
      subTotal,
      total,
      shipping,
      taxes: subTotal * TAXES
    };

    dispatch({ type: 'set-order', payload: orderSummary });
  }, [state.cart]);

  const addToCart = (product: CartProduct) => {
    dispatch({ type: 'add', payload: product });
  };

  const updateCart = (index: number, quantity: number) => {
    dispatch({ type: 'update', payload: { index, quantity } });
  };

  const removeProduct = (index: number) => {
    dispatch({ type: 'remove', payload: index });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCart,
        removeProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
