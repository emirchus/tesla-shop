import { CartProduct } from '../../interfaces';
import { CartState, SummaryProps } from './';

type CartActionType =
  | {
      type: 'add';
      payload: CartProduct;
    }
  | {
      type: 'update';
      payload: { index: number; quantity: number };
    }
  | {
      type: 'set';
      payload: CartProduct[];
    }
  | {
      type: 'remove';
      payload: number;
    }
  | {
      type: 'set-order';
      payload: SummaryProps;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case 'add': {
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case 'update': {
      const { index, quantity } = action.payload;
      const cart = [...state.cart];
      cart[index].quantity = quantity;
      return { ...state, cart };
    }
    case 'set': {
      return { ...state, cart: action.payload };
    }
    case 'remove': {
      const index = action.payload;
      const cart = [...state.cart];
      cart.splice(index, 1);
      return { ...state, cart };
    }
    case 'set-order': {
      return { ...state, orderSummary: action.payload };
    }
    default:
      return state;
  }
};
