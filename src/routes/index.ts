import express from 'express';
import { errorHandler } from '../middleware';
import ApiRouter from './api';

class Routes {
  static configure(app: express.Application) {
    app.use('/api', ApiRouter);
    app.use(errorHandler);
  }
}

export default Routes;
