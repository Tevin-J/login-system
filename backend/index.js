import express from 'express';
import bodyParser from 'body-parser';
import { router as authRouter } from './routes/auth.js';
import { router as postsRouter } from './routes/posts.js';
import * as errorController from './controllers/error.js';
import { getEnv } from './helper/environment.js';

const app = express();
const port = parseInt(getEnv('PORT'), 10) || 3000;
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use(errorController.get404);
app.use(errorController.get500);
app.listen(port, () => console.log(`listening on port ${port}`));
