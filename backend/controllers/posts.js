import { Post } from '../models/post.js';
import { validationResult } from 'express-validator';

export async function fetchAll(req, res, next) {
  console.log('[fetchAll]');
}

export async function createPost(req, res, next) {
  console.log('[createPost] req body:', req.body);
  const errorInfo = validationResult(req);
  if (!errorInfo.isEmpty()) {
    const error = new Error(errorInfo.errors[0].msg);
    error.statusCode = 400;
    next(error);
    return;
  }

  const { title, body, user } = req.body;
  try {
    const post = {
      title,
      body,
      user,
    };
    await Post.create(post);
    res.status(200).json({ message: 'Posted' });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
}

export async function deletePost(req, res, next) {
  console.log('[deletePost]');
}
