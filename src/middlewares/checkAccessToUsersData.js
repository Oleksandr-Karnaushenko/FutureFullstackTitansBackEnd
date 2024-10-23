import createHttpError from "http-errors";

const checkAccessToUsersData = (req, res, next) => {
    const {userId} = req.params;
    if(req.user._id.toString() !== userId) {
      return next(createHttpError(403, 'Access forbidden'))
    }
    next();
}

export default checkAccessToUsersData;