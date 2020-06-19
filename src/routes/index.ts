import { Router } from 'express';

import accountRouter from './account.routes';
import transactionRouter from './transaction.routes';

const routes = Router();

routes.use('/accounts', accountRouter);
routes.use('/transactions', transactionRouter);

export default routes;
