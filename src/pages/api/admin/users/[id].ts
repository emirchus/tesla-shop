import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { hasRole } from '../../../../common/validate-roles';
import { mongo } from '../../../../database';
import { User } from '../../../../interfaces';
import { UserModel } from '../../../../models';

type Data = {
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
    case 'PUT':
      return updateUser(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    query: { id }
  } = req;

  const { role } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const validRoles = ['client', 'admin', 'super-user', 'SEO'];

  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: 'Invalid role. Try using: ' + validRoles.join(', ') });
  }

  await mongo.connect();
  const user = await UserModel.findById(id);

  if (!user) {
    await mongo.disconnect();
    return res.status(404).json({ message: 'User not found' });
  }

  user.role = role;

  await user.save();
  await mongo.disconnect();

  return res.status(200).json({ message: 'Usuario actualizado' });
}
