import jwt from 'jsonwebtoken';
import customError from '../helpers/error.js';

const authMiddleware = (req, res, next) => {
  try {

    const {authorization} = req.headers;
    if (!authorization) {
      next(new customError.NotAuthorizedError('Please, provide a token in request authorization header'));
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      next(new customError.NotAuthorizedError('Please, provide a token'));
    }

    const user = jwt.decode(token, process.env.JWT_SECRET);

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(new customError.NotAuthorizedError('Invalid token'));
  }
};

export default authMiddleware;
