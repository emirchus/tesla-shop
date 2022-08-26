import { mongo } from '.';
import { Product } from '../interfaces';
import ProductModel from '../models/Product';

export const getProductBySlug = async (
  slug: string
): Promise<Product | null | undefined> => {
  await mongo.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await mongo.disconnect();

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
};

export const getAllProductsSlugs = async (): Promise<string[]> => {
  await mongo.connect();
  const slugs = await ProductModel.find().select('slug -_id').lean();
  await mongo.disconnect();

  return slugs.map(({ slug }) => slug);
};

export const searchProducts = async (term: string): Promise<Product[]> => {
  term = term.toString().toLowerCase().trim();

  await mongo.connect();
  const products = await ProductModel.find({
    $text: { $search: term }
  })
    .select('title images price inStock slug -_id')
    .lean();
  await mongo.disconnect();

  return products;
};
