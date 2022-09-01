import { ProductSize, User } from './';

export interface Order {
  _id?: string;
  user?: User | string;
  orderItems: OrderItem[];
  shippingAddress: ShippingInformation;

  subTotal: number;
  total?: number;
  shipping?: number;
  taxes?: number;

  isPaid: boolean;
  paidAt?: string;

  transactionId?: string;
}

export interface OrderItem {
  _id: string;
  title: string;
  size: ProductSize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}

export interface ShippingInformation {
  name: string;
  lastName: string;
  address: string;
  secondaryAddress?: string;
  cp: string;
  city: string;
  country: string;
  phone: string;
}
