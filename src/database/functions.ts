import { isValidObjectId } from 'mongoose';
import { mongo } from '.';
import { Order, Product } from '../interfaces';
import { OrderModel } from '../models';
import ProductModel from '../models/Product';

export const getProductBySlug = async (
  slug: string
): Promise<Product | null | undefined> => {
  await mongo.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await mongo.disconnect();

  if (!product) return null;

  product.images = product.images.map(image => {
    return image.includes('http')
      ? image
      : `${process.env.NEXT_PUBLIC_URL}products/${image}`;
  });

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

  const mappedProducts = products.map(product => {
    product.images = product.images.map(image => {
      return image.includes('http')
        ? image
        : `${process.env.NEXT_PUBLIC_URL}products/${image}`;
    });

    return product;
  });

  return mappedProducts;
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  if (!isValidObjectId(id)) return null;

  await mongo.connect();

  const order = await OrderModel.findById(id).lean();

  await mongo.disconnect();

  if (!order) return null;

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUserId = async (id: string): Promise<Order[]> => {
  if (!isValidObjectId(id)) return [];

  await mongo.connect();

  const orders = await OrderModel.find({
    user: id
  })
    .sort({ updatedAt: -1 })
    .lean();

  await mongo.disconnect();

  return JSON.parse(JSON.stringify(orders));
};
