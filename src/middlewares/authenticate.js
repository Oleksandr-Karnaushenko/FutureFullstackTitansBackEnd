import createHttpError from 'http-errors';
import SessionCollection from '../db/models/sessions.js';
import UserCollection from '../db/models/users.js';

const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });
const findUser = (filter) => UserCollection.findOne(filter);

const authenticate = async (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    return next(createHttpError(401, 'Authorization header not found'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(
      createHttpError(401, 'Authorization header must have Bearer type'),
    );
  }
  const session = await findSessionByAccessToken(token);
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }
  req.user = user;

  next();
};

export default authenticate;
