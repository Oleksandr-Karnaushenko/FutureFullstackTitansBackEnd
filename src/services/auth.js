import { randomBytes } from 'crypto';
import SessionCollection from '../db/models/Session.js'
import {accessTokenLifetime,refreshTokenLifetime} from '../constants/users.js';

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
    const userSession = await SessionCollection.create({
      userId: oldSession._id,
      ...sessionData,
    });
    return userSession;
  };