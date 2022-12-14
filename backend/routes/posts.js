import * as express from 'express';
import { body } from 'express-validator';
import * as postsController from '../controllers/posts.js';

export const router = express.Router();

router.get('/', postsController.fetchAll);
router.post(
  '/',
  [
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('body').trim().isLength({ min: 10 }).not().isEmpty(),
    body('user').trim().isNumeric().not().isEmpty(),
  ],
  postsController.createPost
);
router.delete('/:id', postsController.deletePost);
