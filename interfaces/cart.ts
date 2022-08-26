import { ProductSize, ProductType } from '.';

export interface CartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ProductSize;
  title: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  quantity: number;
  inStock: number;
}
