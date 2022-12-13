import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { getEnv } from '../helper/environment.js';

export async function signup(req, res, next) {
  console.log('[signup] req body', req.body);
  const errorInfo = validationResult(req);
  if (!errorInfo.isEmpty()) {
    const error = new Error(errorInfo.errors[0].msg);
    error.statusCode = 400;
    next(error);
    return;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const userDetails = {
      name,
      email,
      password: hashedPassword,
    };
    await User.save(userDetails);

    res.status(201).send({ message: 'User successfully created' });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
}

export async function login(req, res, next) {
  console.log('[login] req body', JSON.stringify(req.body));
  const errorInfo = validationResult(req);
  if (!errorInfo.isEmpty()) {
    const error = new Error(errorInfo.errors[0].msg);
    error.statusCode = 400;
    next(error);
    return;
  }
  try {
    const { email, password } = req.body;
    const user = await User.find(email);
    if (!user[0].length) {
      const error = new Error('User cannot be found');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];
    const isEqualPassword = await bcrypt.compare(password, storedUser.password);
    if (!isEqualPassword) {
      const error = new Error('Email or password is incorect');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      getEnv('TOKEN_SECRET'),
      { expiresIn: '1h' }
    );
    res.status(200).json({ token, userId: storedUser.id });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
}
