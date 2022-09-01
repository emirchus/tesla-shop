import type { NextApiRequest, NextApiResponse } from 'next';

import { Order } from '../../../interfaces';
import { mongo } from '../../../database';
import { OrderModel } from '../../../models';

type Data =
  | {
      message: string;
    }
  | Order[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
async function getOrders(req: NextApiRequest, res: NextApiResponse<Data>) {
  await mongo.connect();

  const orders = await OrderModel.find({})
    .sort({ cratedAt: 'desc' })
    .populate('user', 'name email -_id')
    .lean();

  await mongo.disconnect();

  return res.status(200).json(orders);
}
