import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '../../../../interfaces';
import { mongo } from '../../../../database';
import { ProductModel } from '../../../../models';
import { MongooseError } from 'mongoose';

type Data =
  | {
      message: string;
    }
  | Product[]
  | Product;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return createProduct(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await mongo.connect();

  const products = await ProductModel.find().sort({ title: 'asc' }).lean();

  await mongo.disconnect();

  //TODO: Update images

  return res.status(200).json(products);
}
async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { images = [] } = req.body as Product;

  if (images.length < 2)
    return res
      .status(400)
      .json({ message: 'Product must have at least 2 images' });

  //TODO : Upload images

  try {
    await mongo.connect();

    const product = new ProductModel(req.body);

    await product.save();

    await mongo.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    if(error instanceof MongooseError) {
      return res.status(400).json({ message: error.message });
    }
    mongo.disconnect();
    return res.status(500).json({ message: 'Internal server error' });
  }
}
