import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/session.js';

import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/users.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const refreshSession = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }
  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const sessionData = createSession();

  console.log('oldSession');
  console.log(oldSession);

  const userSession = await SessionCollection.create({
    userId: oldSession.userId,
    ...sessionData,
  });
  return userSession;
};

export const registerUser = async (payload) => {
  const user = await UserCollection.findOne({
    email: payload.email,
  });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const data = await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  delete data._doc.password;

  return data;
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({
    email: payload.email,
  });
  if (!user) throw createHttpError(401, 'Email or password invalid');

  const correctPassword = await bcrypt.compare(payload.password, user.password);
  if (!correctPassword) throw createHttpError(401, 'Email or password invalid');

  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession();

  const userSession = await SessionCollection.create({
    userId: user._id,
    ...newSession,
  });
  return userSession;
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};
