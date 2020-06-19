import { Router } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

transactionRouter.post('/', async (req, res) => {
  try {
    const { accountId, operation, value } = req.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      accountId,
      operation,
      value,
    });

    return res.json(transaction);
  } catch(err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
