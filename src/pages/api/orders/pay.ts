import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { PaypalResponse } from '../../../interfaces';
import { mongo } from '../../../database';
import { OrderModel } from '../../../models';
import { NextResponse } from 'next/server';
import { isValidObjectId } from 'mongoose';
type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      break;
  }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { transactionId, orderId } = req.body as {
    transactionId: string;
    orderId: string;
  };

  if(!isValidObjectId(orderId)) {
    return res.status(400).json({message: "La orden no existe."})
  }

  const bearerToken = await getPaypalBearerToken();

  if (!bearerToken) {
    return res.status(500).json({ message: 'Error desconocido' });
  }

  try {
    const { data } = await axios.get<PaypalResponse.PaypalOrderStatusResponse>(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      }
    );

    if (data.status !== 'COMPLETED') {
      return res.status(401).json({ message: 'Orden no reconocida' });
    }

    await mongo.connect();

    const dbOrder = await OrderModel.findById(orderId);

    if (!dbOrder) {
      await mongo.disconnect();
      return res.status(400).json({ message: 'La orden pedida no existe' });
    }

    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
      await mongo.disconnect();
      return res.status(400).json({ message: 'El pago fue incompleto.' });
    }

    dbOrder.transactionId = transactionId;

    dbOrder.isPaid = true;
    dbOrder.paidAt = Date.now().toString();

    await dbOrder.save();
    await mongo.disconnect();

    return res.status(200).json({ message: 'Orden pagada' });
  } catch (error) {
    return res.status(500).json({ message: 'Error desconocido' });
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const paypalCredentials = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${paypalCredentials}`
        }
      }
    );
    return data.access_token;
  } catch (error) {
    return null;
  }
};
