import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';

export const updateUser = async (userId, payload) => {
  const result = await UserCollection.findOneAndUpdate(
    { _id: userId },
    payload,
  );

  return result;
};

export const getUserInfo = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, `User with id ${userId} not found!`);
  }

  const name = user.email.split('@')[0];

  return { ...user._doc, name };
};
