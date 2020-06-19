import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '../services/CreateTransactionService';

class TransactionController {
  public async create (req: Request, res: Response) {
    const { accountId, operation, value } = req.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const transaction = await createTransaction.execute({
      accountId,
      operation,
      value,
    });

    return res.json(transaction);
  }
}

export default TransactionController;