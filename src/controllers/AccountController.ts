import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAccountService from '../services/CreateAccountService';
import ListAccountTransactionsService from '../services/ListAccountTransactionsService';

class AccountController {
  public async create (req: Request, res: Response) {
    const { accountType, balance } = req.body;

    const createAccount = container.resolve(CreateAccountService);

    const account = await createAccount.execute({
      accountType,
      balance,
    });

    return res.json(account);
  }

  public async list (req: Request, res: Response) {
    const { id } = req.params;

    const listAccount = container.resolve(ListAccountTransactionsService);

    const account = await listAccount.execute(id);

    return res.json(account);
  }

}

export default AccountController;