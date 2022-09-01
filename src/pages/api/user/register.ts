import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo } from '../../../database';
import { UserModel } from '../../../models';

import * as argon2 from 'argon2';
import { jwt, validators } from '../../../common';

type Data =
  | {
      message: string;
    }
  | {
      message: string;
      token: string;
      user: {
        role: string;
        name: string;
        email: string;
      };
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return register(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: 'Por favor ingresá correo, contraseña y nombre' });
  }

  const validatedEmail = validators.isValidEmail(email);

  if (!validatedEmail) {
    return res.status(400).json({ message: 'Correo inválido' });
  }

  await mongo.connect();
  const existsEmail = await UserModel.findOne({ email });
  if (existsEmail) {
    await mongo.disconnect();
    return res.status(400).json({ message: 'El correo ya existe!' });
  }

  const user = new UserModel({
    name,
    email,
    password: await argon2.hash(password),
    role: 'client'
  });

  try {
    await user.save({ validateBeforeSave: true });
  } catch (error) {
    await mongo.disconnect();
    return res
      .status(500)
      .json({ message: 'Hubo un error interno del servidor' });
  }
  await mongo.disconnect();

  const jwtSign = jwt.createJWT({
    _id: user._id,
    email
  });
  return res.status(200).json({
    message: 'Success',
    token: jwtSign,
    user: { role: user.role, name, email }
  });
};
