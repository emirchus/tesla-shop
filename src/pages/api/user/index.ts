import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo } from '../../../database';
import { UserModel } from '../../../models';

import { jwt } from '../../../common';

type Data =
  | {
      message: string;
    }
  | {
      message: string;
      user: {
        role: string;
        name: string;
        email: string;
      };
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return validateJWT(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
const validateJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { authorization = '' } = req.cookies;

  if (!authorization) {
    resetCookie(res);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { _id, email } = jwt.verifyJWT(authorization);

  if (!_id || !email) {
    resetCookie(res);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await mongo.connect();
  const user = await UserModel.findOne({ _id });
  await mongo.disconnect();

  if (!user) {
    resetCookie(res);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const jwtSign = jwt.createJWT({
    _id: user._id,
    email
  });
  res.setHeader(
    'set-cookie',
    `authorization=${jwtSign}; path=/; samesite=lax; httponly;`
  );

  return res.status(200).json({
    message: 'Success',
    user: { role: user.role, name: user.name, email }
  });
};

const resetCookie = (res: NextApiResponse<Data>) => {
  res.setHeader(
    'set-cookie',
    'authorization=; path=/; samesite=lax; httponly;'
  );
};
