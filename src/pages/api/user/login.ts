import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo } from '../../../database';
import { UserModel } from '../../../models';

import * as argon2 from 'argon2';
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide an email and password' });
  }

  await mongo.connect();
  const user = await UserModel.findOne({ email });
  await mongo.disconnect();

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const validPassword = await argon2.verify(user.password!, password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  const { role, name } = user;
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
    user: { role, name, email }
  });
};
