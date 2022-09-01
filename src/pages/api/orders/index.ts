import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '../../../interfaces';
import { getSession } from 'next-auth/react';
import { mongo } from '../../../database';
import { OrderModel, ProductModel } from '../../../models';

type Data =
  | {
      message: string;
    }
  | Order;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      break;
  }
}
async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { orderItems, total } = req.body as Order;

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ message: 'Debe haber iniciado sesión para continuar' });
  }

  const productsIds = orderItems.map(product => product._id);
  console.log(orderItems);

  await mongo.connect();
  const dbProducts = await ProductModel.find({
    _id: { $in: productsIds }
  });

  try {
    const subTotal = orderItems.reduce((prev, curr) => {
      const currentPrice = dbProducts.find(
        product => product.id === curr._id
      )?.price;

      if (!currentPrice) {
        throw new Error('Hubo un error al leer los productos');
      }

      return prev + currentPrice * curr.quantity;
    }, 0);

    const TAXES = Number(process.env.NEXT_PUBLIC_TAX || 0);

    const shipping = subTotal <= 1200 ? 120 : 0;

    const realTotal = subTotal * (1 + TAXES) + shipping;

    if (total !== realTotal) {
      throw Error('Hubo un error al calcular el precio total');
    }

    const userId = (session.user as any)._id;

    const newOrder = new OrderModel({
      ...req.body,
      isPaid: false,
      user: userId
    });

    await newOrder.save();

    await mongo.disconnect();
    return res.status(200).json(newOrder);
  } catch (error: any) {
    await mongo.disconnect();
    return res
      .status(400)
      .json({ message: error.message || 'Wrong detector view logs' });
  }
}
