import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const isValidId = (req, res, next) => {
  const { id, userId } = req.params;
  if (id) {
    if (!isValidObjectId(id)) {
      return next(createHttpError(400, `${id} is not valid Id!`));
    }
  }
  if (userId) {
    if (!isValidObjectId(userId)) {
      return next(createHttpError(400, `${userId} is not valid Id!`));
    }
  }

  next();
};

export default isValidId;
