import createHttpError from 'http-errors';

const checkAccessToUsersData = (req, res, next) => {
  const { id, userId } = req.params;
  const reqId = userId || id;

  if (req.user._id.toString() !== reqId) {
    return next(createHttpError(403, 'Access forbidden'));
  }
  next();
};

export default checkAccessToUsersData;
