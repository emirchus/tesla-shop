import { mongo } from '.';
import { UserModel } from '../models';
import argon from 'argon2';

export const checkUserEmailPassword = async (
  email: string,
  password: string
): Promise<any> => {
  await mongo.connect();
  const user = await UserModel.findOne({ email }).lean();
  if (!user) {
    return null;
  }
  const isMatch = argon.verify(user.password!, password);
  if (!isMatch) {
    return null;
  }

  const { password: pwd, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const oAuthToUser = async (
  oAuthEmail: string,
  oAuthName: string,
  oAuthProfile: string = ''
) => {
  await mongo.connect();
  const user = await UserModel.findOne({ email: oAuthEmail }).lean();
  if (user) {
    await mongo.disconnect();
    const { password: pwd, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  const newUser = new UserModel({
    email: oAuthEmail,
    name: oAuthName,
    image: oAuthProfile,
    password: '@',
    role: 'client'
  });

  await newUser.save();
  await mongo.disconnect();

  const { _id, email, name, image, role } = newUser;

  return { _id, email, name, image, role };
};
