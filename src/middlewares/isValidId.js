import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

const isValidId = (req, res, next) => {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
        return next(createHttpError(404, `${userId} is not valid Id!`));
    }
    next();
};

export default isValidId;