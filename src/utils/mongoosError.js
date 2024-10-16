const errorStatus = ({ name, code }) =>
  code === 11000 && name === 'MongoServerError';

const mongoServerError = (error, data, next) => {
  error.status = errorStatus(error) ? 409 : 400;

  next();
};

export default mongoServerError;
