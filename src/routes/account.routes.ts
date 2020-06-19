import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AccountController from '../controllers/AccountController';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.post(
  '/', 
  celebrate({
    [Segments.BODY]: {
      accountType: Joi.string().required(),
      balance: Joi.number().required(),
    }
  }),
  accountController.create,
);

accountRouter.get('/transactions/:id', accountController.list);

export default accountRouter;
