import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

const createToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  return token;
};

export default createToken;
