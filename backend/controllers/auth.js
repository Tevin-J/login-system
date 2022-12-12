import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

export async function signup(req, res, next) {
  console.log('signup req body', req.body);
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
