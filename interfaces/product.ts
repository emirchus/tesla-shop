export interface Product {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ProductSize[];
  slug: string;
  tags: string[];
  title: string;
  type: ProductType;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  createdAt: Date;
  updatedAt: Date;
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ProductType = 'shirts' | 'pants' | 'hoodies' | 'hats';
