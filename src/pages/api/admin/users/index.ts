import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo } from '../../../../database';
import { User } from '../../../../interfaces';
import { UserModel } from '../../../../models';

import { getSession } from 'next-auth/react';
import { hasRole } from '../../../../common/';
type Data =
  | {
      message: string;
    }
  | User[];

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
      return getUsers(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
  await mongo.connect();

  const users = await UserModel.find().select('-password').lean();
  await mongo.disconnect();

  return res.status(200).json(users);
}
