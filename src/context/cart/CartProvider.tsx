import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { CartProduct, Order, ShippingInformation } from '../../interfaces';
import { CartContext, cartReducer, SummaryProps } from './';
import Cookies from 'js-cookie';
import { teslaAPI } from '../../api';
import { AxiosError } from 'axios';
export interface CartState {
  cart: CartProduct[];
  orderSummary: SummaryProps;
  isLoaded: boolean;
  shippingInformation?: ShippingInformation;
}

const Cart_InitialState: CartState = {
  cart: [],
  orderSummary: {
    subTotal: 0
  },
  isLoaded: false,
  shippingInformation: undefined
};

const getAddressFromCookies = (): ShippingInformation => {
  return {
    name: Cookies.get('name') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    secondaryAddress: Cookies.get('secondaryAddress') || '',
    cp: Cookies.get('cp') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || 'ARG',
    phone: Cookies.get('phone') || ''
  };
};
export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_InitialState);

  useEffect(() => {
    const cart = Cookies.get('cart');
    dispatch({ type: 'set', payload: JSON.parse(cart || '[]') });
    if (Cookies.get('name')) {
      dispatch({ type: 'set-shipping-info', payload: getAddressFromCookies() });
    }
  }, []);

  useEffect(() => {
    if (state.isLoaded) {
      Cookies.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart, state.isLoaded]);

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

  const setShippingInformation = (shippingInformation: ShippingInformation) => {
    Cookies.set('name', shippingInformation.name);
    Cookies.set('lastName', shippingInformation.lastName);
    Cookies.set('address', shippingInformation.address);
    Cookies.set('secondaryAddress', shippingInformation.secondaryAddress || '');
    Cookies.set('cp', shippingInformation.cp);
    Cookies.set('city', shippingInformation.city);
    Cookies.set('country', shippingInformation.country);
    Cookies.set('phone', shippingInformation.phone);
    dispatch({ type: 'set-shipping-info', payload: shippingInformation });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    try {
      if (!state.shippingInformation) {
        throw new Error('No hay dirección de envio');
      }

      const body: Order = {
        orderItems: state.cart.map(p => {
          return {
            ...p,
            size: p.size!
          };
        }),
        shippingAddress: state.shippingInformation!,
        subTotal: state.orderSummary.subTotal,
        shipping: state.orderSummary.shipping,
        taxes: state.orderSummary.taxes,
        total: state.orderSummary.total,
        isPaid: false
      };
      const { data } = await teslaAPI.post<Required<Order>>('/orders', body);

      dispatch({type: "order-complete"});


      return {
        hasError: false,
        message: data._id
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          hasError: true,
          message: error.response?.data.message || 'Error desconocido'
        };
      }
      return {
        hasError: true,
        message: (error as any).message || 'Error desconocido'
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateCart,
        removeProduct,
        setShippingInformation,
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
