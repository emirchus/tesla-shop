import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo, seedDb } from '../../database';
import ProductModel from '../../models/Product';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production')
    return res.status(500).json({ message: 'Production mode' });

  await mongo.connect();

  await ProductModel.deleteMany();
  await ProductModel.insertMany(seedDb.initialData.products);

  await mongo.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' });
}
