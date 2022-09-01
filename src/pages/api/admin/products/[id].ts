import type { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '../../../../interfaces';
import { mongo } from '../../../../database';
import { ProductModel } from '../../../../models';
import { isValidObjectId } from 'mongoose';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');

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
    case 'PUT':
      return updateProduct(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id }
  } = req;

  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'Invalid ID' });

  await mongo.connect();

  const product = await ProductModel.findById(id).lean();

  await mongo.disconnect();

  if (!product) return res.status(404).json({ message: 'Product not found' });

  //TODO: Update images

  return res.status(200).json(product);
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id }
  } = req;

  if (!isValidObjectId(id))
    return res.status(400).json({ message: 'Invalid ID' });

  const { _id, images = [], ...productData } = req.body as Product;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'Product must have at least 2 images' });
  }

  //TODO: Borrar imagenes pana

  try {
    await mongo.connect();

    const product = await ProductModel.findById(id);

    if (!product) {
      await mongo.disconnect();
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.images.forEach(async image => {
      if (!images.includes(image) && image.startsWith('https')) {
        const [public_id, extension] = image.split('/').pop()!.split('.');
        await cloudinary.uploader.destroy(public_id);
      }
    });

    await product.update(productData);

    await product.save();

    await mongo.disconnect();

    //TODO: Update images

    return res.status(200).json(product);
  } catch (error) {
    await mongo.disconnect();
  }
}
