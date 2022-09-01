import jwt from 'jsonwebtoken';

interface SigninPayload {
  email: string;
  _id: string;
}

export const createJWT = (payload: SigninPayload): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyJWT = (token: string): SigninPayload => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  if(token.length < 10) {
    throw new Error('Invalid token');
  }
  return jwt.verify(token, process.env.JWT_SECRET) as SigninPayload;
};

export const reValidateJWT = (token: string): SigninPayload => {
  const payload = verifyJWT(token);
  const { email, _id } = payload;
  if (!email || !_id) {
    throw new Error('Invalid payload');
  }
  return payload;
}