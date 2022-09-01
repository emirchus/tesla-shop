import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo, seedDb, SHOP_CONSTANTS } from '../../../database';
import { Product } from '../../../interfaces';
import ProductModel from '../../../models/Product';

type Data =
  | {
      message: string;
    }
  | Product[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    default:
      return res.status(501).json({ message: 'Not implemented' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    query: { gender }
  } = req;

  await mongo.connect();

  let condition = {};

  if (gender && SHOP_CONSTANTS.validGenders.includes(gender as string)) {
    condition = { gender };
  }

  const products = await ProductModel.find(condition)
    .select('title images price inStock slug gender -_id')
    .lean();

  await mongo.disconnect();

  return res.status(200).json(products);
};
