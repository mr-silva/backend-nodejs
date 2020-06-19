import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TransactionController from '../controllers/TransactionController';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      accountId: Joi.string().required(),
      operation: Joi.string().required(),
      value: Joi.number().required(),
    }
  }),
  transactionController.create,
);

export default transactionRouter;
