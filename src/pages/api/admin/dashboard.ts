import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo } from '../../../database';
import { OrderModel, ProductModel, UserModel } from '../../../models';
import { getSession } from 'next-auth/react';
import { hasRole } from '../../../common';
type Data =
  | {
      orders: number;
      ordersPayed: number;
      withouPayOrders: number;
      clients: number;
      products: number;
      productsWithoutStock: number;
      productsWithBreak: number;
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const validRoles = ['admin', 'super-user', 'SEO'];
  const hasPermission = await hasRole(req, validRoles);
  if (!hasPermission) {
    return res
      .status(401)
      .json({ message: 'No tienes permisos para ver esta página' });
  }
  switch (req.method) {
    case 'GET':
      return getDashboardData(req, res);
    default:
      return res.status(405).json({
        message: `Method ${req.method} Not Allowed`
      });
  }
}

async function getDashboardData(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await mongo.connect();

  const [
    products,
    productsWithoutStock,
    productsWithBreak,
    orders,
    ordersPayed,
    clients
  ] = await Promise.all([
    ProductModel.find({}).count(),
    ProductModel.find({ inStock: 0 }).count(),
    ProductModel.find({
      inStock: { $lte: 10 }
    }).count(),
    OrderModel.find({}).count(),
    OrderModel.find({ isPaid: true }).count(),
    UserModel.find({ role: 'client' }).count()
  ]);

  await mongo.disconnect();

  return res.status(200).json({
    orders,
    ordersPayed,
    withouPayOrders: orders - ordersPayed,
    products,
    productsWithoutStock,
    productsWithBreak,
    clients
  });
}
