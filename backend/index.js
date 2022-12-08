import express from 'express';
import bodyParser from 'body-parser';
import { router as authRoutes } from './routes/auth.js';
import * as errorController from './controllers/error.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/auth', authRoutes);
app.use(errorController.get404);
app.use(errorController.get500);
app.listen(port, () => console.log(`listening on port ${port}`));
