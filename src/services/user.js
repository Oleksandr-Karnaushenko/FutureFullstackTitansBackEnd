import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';

export const findUser = async (userId) =>
  await UserCollection.findOne({ _id: userId });

export const getUserInfo = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, `User with id ${userId} not found!`);
  }

  const name = user.email.split('@')[0];

  return { ...user._doc, name };
};
