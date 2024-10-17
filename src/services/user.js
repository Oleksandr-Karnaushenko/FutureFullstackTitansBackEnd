import createHttpError from 'http-errors';
import UserCollection from '../db/models/users.js';

export const updateUser = async (userId, payload, options) => {
  const result = await UserCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  return result.value;
};

export const getUserInfo = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, `User with id ${userId} not found!`);
  }

  const name = user.email.split('@')[0];

  return { ...user._doc, name };
};
