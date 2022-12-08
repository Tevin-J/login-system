import express from 'express';
import { body } from 'express-validator';
import { User } from '../models/user.js';
import * as authController from '../controllers/auth.js';
export const router = express.Router();
router.post(
  '/signup',
  [
    body('name').trim().not().isEmpty(),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom(async (email) => {
        const user = await User.find(email);
        console.log('found user', user[0]);
        if (user[0].length) {
          console.log('user already exist');
          return Promise.reject('User with such email already exist');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
  ],
  authController.signup
);
