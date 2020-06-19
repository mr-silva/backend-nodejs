import 'reflect-metadata';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import './container';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

dotenv.config();

const application = express();

application.use(bodyParser.text());
application.use(express.json());
application.use(express.urlencoded({ extended: false }));
application.use(cors());
application.use(routes);

application.use(errors());

application.use((err: Error, request: express.Request, response: express.Response, _: express.NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      error: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    error: 'error',
    message: err.message,
  });
});

application.set('port', process.env.APP_PORT || 5000);

export { application };
