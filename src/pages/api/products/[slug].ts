import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo } from '../../../database';
import { Product } from '../../../interfaces';
import ProductModel from '../../../models/Product';

type Data =
  | {
      message: string;
    }
  | Product;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProduct(req, res);
      break;
    default:
      return res.status(501).json({ message: 'Not implemented' });
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    query: { slug }
  } = req;

  await mongo.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await mongo.disconnect();

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.images = product.images.map(image => {
    return image.includes('http')
      ? image
      : `${process.env.NEXT_PUBLIC_URL}/products/${image}`;
  });

  return res.status(200).json(product);
};
