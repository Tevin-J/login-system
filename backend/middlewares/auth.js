import jwt from 'jsonwebtoken';
import { getEnv } from '../helper/environment.js';
export function auth(req, res, next) {
  const auhtHeader = req.headers['authorization'];
  if (!auhtHeader) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = auhtHeader.replace('Bearer ', '');
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, getEnv('TOKEN_SECRET'));
  } catch (e) {
    e.statusCode = 500;
    throw e;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.isLoggedIn = true;
  req.userId = decodedToken.userId;

  next();
}
