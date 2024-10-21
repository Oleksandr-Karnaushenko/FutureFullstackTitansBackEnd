import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

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

export const updateUserInfo = async (userId, payload) => {
  const { oldPassword, password, ...otherPayload } = payload;

  const user = await UserCollection.findOne({ _id: userId });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  if (oldPassword) {
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw createHttpError(401, 'Invalid password');
    }
  }

  const updateData = { ...otherPayload };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  const result = await UserCollection.findOneAndUpdate(
    { _id: userId },
    { $set: updateData },
    { new: true, includeResultMetadata: true, projection: { password: 0 } },
  );

  return result.value;
};

export const getUserInfo = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, `User with id ${userId} not found!`);
  }
  delete user._doc.password;

  return user;
};
