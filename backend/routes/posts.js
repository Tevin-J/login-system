import * as express from 'express';
import { body } from 'express-validator';
import * as postsController from '../controllers/posts.js';
import { auth } from '../middlewares/auth.js';

export const router = express.Router();

router.get('/', auth, postsController.fetchAll);
router.post(
  '/',
  [
    auth,
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('body').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().isNumeric().not().isEmpty(),
  ],
  postsController.createPost
);
router.delete('/:id', auth, postsController.deletePost);
