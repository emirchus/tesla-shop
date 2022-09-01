import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo } from '../../../database';
import { Product } from '../../../interfaces';
import ProductModel from '../../../models/Product';

type Data =
  | {
      message: string;
    }
  | Product[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProduct(req, res);
      break;
    default:
      return res.status(501).json({ message: 'Not implemented' });
  }
}

const searchProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let {
    query: { search = '' }
  } = req;

  if (search.toString().trim().length === 0) {
    return res.status(400).json({ message: 'Search is empty' });
  }

  search = search.toString().toLowerCase().trim();

  await mongo.connect();
  const products = await ProductModel.find({
    $text: { $search: search }
  })
    .select('title images price inStock slug -_id')
    .lean();
  await mongo.disconnect();

  return res.status(200).json(products);
};
